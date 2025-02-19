import { defineStore } from 'pinia';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import { useApiState } from '@Stores/api-store.js';
import { useFormState } from '@Stores/form-store.js';
import { useStoreState } from '@Stores/store-store.js';
import { useNotificationState } from '@Stores/notification-store.js';
import { getApi, putApi, postApi, deleteApi } from '@Repositories/api-repository.js';

export const useOnboardingState = defineStore('onboarding', {
    state: () => {
        return {
            pagination: null,
            uploadMessage: '',
            paymentMethods: [],
            isUploading: false,
            totalCompletedSteps: 0,
            apiState: useApiState(),
            totalCompletedUploads: 0,
            formState: useFormState(),
            originalPaymentMethods: [],
            storeState: useStoreState(),
            associatedPaymentMethods: [],
            unassociatedPaymentMethods: [],
            isCreatingPaymentMethod: false,
            isSubmittingPaymentMethods: false,
            notificationState: useNotificationState(),
            isLoadingUnassociatedPaymentMethods: false,
        }
    },
    actions: {
        reset() {
            this.pagination = null;
            this.uploadMessage = '';
            this.paymentMethods = [];
            this.isUploading = false;
            this.totalCompletedSteps = 0;
            this.totalCompletedUploads = 0;
            this.originalPaymentMethods = [];
            this.associatedPaymentMethods = [];
            this.unassociatedPaymentMethods = [];
            this.isCreatingPaymentMethod = false;
            this.isSubmittingPaymentMethods = false;
            this.isLoadingUnassociatedPaymentMethods = false;
        },
        getPaymentMethodValidationErrors(configSchemaEntity, configs) {
            let errors = [];

            // Ensure validation rules exist
            if (!configSchemaEntity.hasOwnProperty('validationRules')) {
                return errors;
            }

            const value = configs[configSchemaEntity.attribute];

            // Check for required validation
            if (configSchemaEntity.validationRules.hasOwnProperty('required')) {
                const [isRequired, message] = configSchemaEntity.validationRules.required;

                if (isRequired) {
                    if (
                        value === null ||
                        value === undefined ||
                        (typeof value === "string" && value.trim() === "") ||
                        (typeof value === "object" && Object.keys(value).length === 0) ||
                        (Array.isArray(value) && value.length === 0)
                    ) {
                        errors.push(message);
                    }
                }
            }

            // Check for regex pattern validation (only applicable for string values)
            if (configSchemaEntity.validationRules.hasOwnProperty('regexPattern')) {
                const [pattern, message] = configSchemaEntity.validationRules.regexPattern;

                if (typeof value === "string") {
                    try {
                        const regex = new RegExp(pattern);
                        if (!regex.test(value.trim())) {
                            errors.push(message);
                        }
                    } catch (e) {
                        console.error("Invalid regex pattern:", pattern);
                    }
                }
            }

            // Check for QR Code validation
            if (configSchemaEntity.validationRules?.qrCode) {
                const [message] = configSchemaEntity.validationRules.qrCode;

                if (!value || !value.validQR) {
                    errors.push(message);
                }
            }

            // Check for MIME Type validation
            if (configSchemaEntity.validationRules?.mimeTypes) {
                const [allowedMimeTypes, message] = configSchemaEntity.validationRules.mimeTypes;

                if (value && value.fileRef) {
                    const uploadedFileType = value.fileRef.type;

                    if (!allowedMimeTypes.includes(uploadedFileType)) {
                        errors.push(message);
                    }
                }
            }

            // Check for maxSize validation
            if (configSchemaEntity.validationRules.hasOwnProperty('maxSize')) {

                const [maxSize, message] = configSchemaEntity.validationRules.maxSize;

                if (value?.fileRef && value.fileRef.size > maxSize) {
                    errors.push(message);
                }
            }

            return errors;
        },
        getPaymentMethodFirstValidationError(configSchemaEntity, configs) {
            const errors = this.getPaymentMethodValidationErrors(configSchemaEntity, configs);
            return errors.length ? errors[0] : null;
        },
        checkIfPaymentMethodConfigSchemaEntityPassesCondition(configSchemaEntity, configs) {

            if (!configSchemaEntity.hasOwnProperty('condition')) {
                // No condition means it's always valid
                return true;
            }

            return configSchemaEntity.condition.every(condition => {

                // Ensure condition follows 'attribute=value' or 'attribute!=value' format
                const match = condition.match(/^([^!=]+)(!=|=)(.+)$/);

                if (!match) {
                    console.warn(`Invalid condition format: ${condition}`);
                    return false;
                }

                const [, attribute, operator, expectedValue] = match.map(str => str.trim());

                // Check if attribute exists in the configs
                if (!configs.hasOwnProperty(attribute)) {
                    return false;
                }

                // Handle equality and inequality conditions
                if (operator === '=') {
                    return configs[attribute] === expectedValue;
                } else if (operator === '!=') {
                    return configs[attribute] !== expectedValue;
                }

                return false;
            });
        },
        setPaymentMethods() {
            this.paymentMethods = cloneDeep([...this.associatedPaymentMethods, ...this.unassociatedPaymentMethods]);
            this.setOriginalPaymentMethods();
        },
        setOriginalPaymentMethods() {
            this.originalPaymentMethods = cloneDeep(this.paymentMethods);
        },
        showAssociatedPaymentMethods() {

            //  Start loader
            this.isLoadingAssociatedPaymentMethods = true;

            const params = {
                'storeId': this.store.id,
                '_relationships': 'paymentMethod,photo,logo'
            };

            getApi(this.apiState.apiHome._links['showStorePaymentMethods'], params).then(response => {

                if (response.status == 200) {

                    this.pagination = response.data;
                    this.associatedPaymentMethods = this.pagination.data.map((storePaymentMethod) => {

                        const logo = storePaymentMethod._relationships.logo;
                        const photo = storePaymentMethod._relationships.photo;
                        const paymentMethod = storePaymentMethod._relationships.paymentMethod;

                        // Create initial config object from configSchema
                        let configs = Object.fromEntries(
                            paymentMethod.configSchema
                                .filter(configSchema => !['content'].includes(configSchema.type))
                                .map(configSchema => [
                                    configSchema.attribute,
                                    configSchema.default ?? null
                                ])
                        );

                        // Merge existing configs from storePaymentMethod
                        configs = { ...configs, ...(storePaymentMethod.configs ?? {}) };

                        let result = {
                            configs: configs,
                            id: paymentMethod.id,
                            name: paymentMethod.name,
                            type: paymentMethod.type,
                            active: storePaymentMethod.active,
                            logo: paymentMethod._attributes.imageUrl,
                            configSchema: paymentMethod.configSchema,
                            customName: storePaymentMethod.customName,
                            _links: storePaymentMethod._links
                        };

                        // Iterate through the configSchema and handle image type
                        paymentMethod.configSchema.forEach(configSchemaEntity => {

                            if (configSchemaEntity.type === 'image' && configSchemaEntity.attribute == 'logo') {

                                result.configs[configSchemaEntity.attribute] = {
                                    filePath: logo ? logo.filePath : null,
                                    deleting: false
                                };

                            }else if (configSchemaEntity.type === 'image' && configSchemaEntity.attribute == 'photo') {

                                result.configs[configSchemaEntity.attribute] = {
                                    filePath: photo ? photo.filePath : null,
                                    deleting: false
                                };

                            }

                        });

                        return result;
                    });

                    this.setPaymentMethods();
                }

                //  Stop loader
                this.isLoadingAssociatedPaymentMethods = false;

            }).catch(errorException => {

                //  Stop loader
                this.isLoadingAssociatedPaymentMethods = false;

                this.formState.setServerFormErrors(errorException);
            });

        },
        showUnassociatedPaymentMethods() {

            //  Start loader
            this.isLoadingUnassociatedPaymentMethods = true;

            const params = {
                'storeId': this.store.id,
                'association': 'unassociated'
            };

            getApi(this.apiState.apiHome._links['showPaymentMethods'], params).then(response => {

                if(response.status == 200) {
                    this.pagination = response.data;
                    this.unassociatedPaymentMethods = this.pagination.data.map((paymentMethod) => {

                        let result = {
                            active: false,
                            id: paymentMethod.id,
                            name: paymentMethod.name,
                            type: paymentMethod.type,
                            customName: paymentMethod.name,
                            logo: paymentMethod._attributes.imageUrl,
                            configSchema: paymentMethod.configSchema,
                            configs: Object.fromEntries(
                                paymentMethod.configSchema
                                    .filter(configSchema => !['content'].includes(configSchema.type))
                                    .map(configSchema => [
                                        configSchema.attribute,
                                        configSchema.default ?? null
                                    ])
                            )
                        }

                        // Iterate through the configSchema and handle image type
                        paymentMethod.configSchema.forEach(configSchemaEntity => {

                            if (configSchemaEntity.type === 'image') {

                                result.configs[configSchemaEntity.attribute] = {
                                    filePath:  null
                                };

                            }

                        });

                        return result;

                    });

                    this.setPaymentMethods();
                }

                //  Stop loader
                this.isLoadingUnassociatedPaymentMethods = false;

            }).catch(errorException => {

                //  Stop loader
                this.isLoadingUnassociatedPaymentMethods = false;

                this.formState.setServerFormErrors(errorException);

            });

        },
        async submitPaymentMethods() {

            // Indicate that payment method submittion is in progress
            this.isSubmittingPaymentMethods = true;

            // Create all store payment methods one by one
            let storePaymentMethodCreationPromises = this.changedPaymentMethods.map((paymentMethod) => {

                if(paymentMethod._links) {
                    return this.updatePaymentMethod(paymentMethod);
                }else if(paymentMethod.active) {
                    return this.addPaymentMethod(paymentMethod);
                }

            });

            // Process all store payment method submittion requests
            await Promise.allSettled(storePaymentMethodCreationPromises)
                .then((results) => {

                    let successCount = 0;
                    let errors = [];

                    results.forEach((result, index) => {
                        if (result.status === 'fulfilled') {
                            successCount++;
                        } else {
                            errors.push(`Payment method ${index + 1}: ${result.reason?.message || 'An error occurred'}`);
                            this.formErrorMessagesIndex = index;
                            this.formState.setServerFormErrors(result.reason, index);
                        }
                    });

                    if (successCount) {
                        if(this.hasAssociatedPaymentMethods) {
                            this.notificationState.addSuccessNotification('Payment methods updated!');
                        }else{
                            this.notificationState.addSuccessNotification('Payment methods added!');
                        }
                    }

                    if (errors.length > 0) {
                        this.notificationState.addWarningNotification(errors.join('\n'));
                    }

                })
                .catch((error) => {
                    this.notificationState.addWarningNotification('An unexpected error occurred while submitting payment methods.');
                    console.error(error);
                })
                .finally(() => {
                    this.isSubmittingPaymentMethods = false; // ✅ Payment method creation done
                });
        },
        async addPaymentMethod(paymentMethod) {

            if (paymentMethod._links) return;

            let storePaymentMethodData = {
                return: '1',
                storeId: this.store.id,
                active: paymentMethod.active,
                configs: paymentMethod.configs,
                paymentMethodId: paymentMethod.id,
                customName: paymentMethod.customName,
            };

            this.uploadMessage = `Creating ${paymentMethod.name}`;

            try {

                const createStorePaymentMethodUrl = this.apiState.apiHome['_links']['createStorePaymentMethod'];
                const response = await postApi(createStorePaymentMethodUrl, storePaymentMethodData);

                if (response.status === 200 && response.data['created'] == true) {

                    if(this.totalCompletedSteps < this.totalCompletionSteps) this.totalCompletedSteps++;
                    let createdStorePaymentMethod = response.data.storePaymentMethod;
                    paymentMethod._links = createdStorePaymentMethod._links;

                    await this.uploadStorePaymentMethodImages(paymentMethod);

                }

            } catch (error) {
                console.error(`❌ Failed to add payment method:`, error);
            }

        },
        async updatePaymentMethod(paymentMethod) {
            if (!paymentMethod._links) return;

            let storePaymentMethodData = {
                active: paymentMethod.active,
                configs: paymentMethod.configs,
                customName: paymentMethod.customName,
            };

            try {

                const response = await putApi(paymentMethod._links.updateStorePaymentMethod, storePaymentMethodData);

                if (response.status === 200 && response.data['updated'] == true) {

                    if(this.totalCompletedSteps < this.totalCompletionSteps) this.totalCompletedSteps++;

                }

            } catch (error) {
                console.error(`❌ Failed to update payment method:`, error);
            }
        },
        async uploadStorePaymentMethodImages(paymentMethod) {
            if (!paymentMethod._links) return;

            let imageUploadPromises = paymentMethod.configSchema
                .filter(configSchema => configSchema.type === 'image')
                .map(configSchema => {
                    const imageConfig = paymentMethod.configs[configSchema.attribute];
                    if (!imageConfig?.fileRef) return null;
                    return this.uploadSinglePaymentMethodImage(paymentMethod, configSchema.attribute);
                })
                .filter(Boolean);

            if (imageUploadPromises.length === 0) return;

            this.isUploading = true;
            this.uploadMessage = `Uploading images...`;

            const results = await Promise.allSettled(imageUploadPromises);
            let failedUploads = results.filter(result => result.status === 'rejected').length;

            if (failedUploads > 0) {
                this.notificationState.addWarningNotification(`⚠️ ${failedUploads} image(s) failed to upload. You can retry manually.`);
            }

            this.isUploading = false;
        },
        async uploadSinglePaymentMethodImage(paymentMethod, attribute, retryCount = 0) {
            if (!paymentMethod._links) return;

            if (retryCount > 2) {
                console.warn(`❌ Image upload for '${paymentMethod.name}' failed after 3 attempts.`);
                paymentMethod.configs[attribute].uploaded = false;
                return Promise.reject(`Failed after 3 attempts`);
            }

            let url = null;
            let formData = new FormData();
            formData.append('return', '1');

            if (attribute === 'logo') {
                url = paymentMethod._links.uploadStorePaymentMethodLogo;
                formData.append('store_payment_method_logo', paymentMethod.configs.logo.fileRef);
            } else if (attribute === 'photo') {
                url = paymentMethod._links.uploadStorePaymentMethodPhoto;
                formData.append('store_payment_method_photo', paymentMethod.configs.photo.fileRef);
            } else {
                console.warn(`❌ The ${attribute} upload URL has not been provided for '${paymentMethod.name}'`);
                return;
            }

            paymentMethod.configs[attribute].uploading = true;

            try {

                const response = await postApi(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } });

                if (response.status === 200 && response.data['uploaded'] == true) {

                    if(this.totalCompletedSteps < this.totalCompletionSteps) this.totalCompletedSteps++;
                    this.totalCompletedUploads++;

                    paymentMethod.configs[attribute] = {
                        uploaded: true,
                        deleting: false,
                        filePath: response.data.mediaFile.filePath,
                    };

                    console.log(`✅ Image for '${paymentMethod.name}' uploaded successfully.`);
                    this.uploadMessage = `Uploaded ${this.totalCompletedUploads}/${this.totalUploads} images`;

                    return response;

                } else {
                    throw new Error(`Upload failed`);
                }

            } catch (error) {
                console.error(`⚠️ Image upload for '${paymentMethod.name}' attempt ${retryCount + 1} failed.`);
                await new Promise(resolve => setTimeout(resolve, 2000)); // ⏳ Add delay before retrying
                await this.uploadSinglePaymentMethodImage(paymentMethod, attribute, retryCount + 1);
            } finally {
                paymentMethod.configs[attribute].uploading = false;
            }
        },
        async deletePaymentMethodImage(paymentMethod, attribute) {

            let deleteUrl = null;

            if (attribute === 'logo' && paymentMethod._links) {
                deleteUrl = paymentMethod._links.deleteStorePaymentMethodLogo;
            } else if (attribute === 'photo' && paymentMethod._links) {
                deleteUrl = paymentMethod._links.deleteStorePaymentMethodPhoto;
            } else {
                console.warn(`❌ No delete URL provided for '${attribute}' on '${paymentMethod.name}'`);
                return;
            }

            try {
                paymentMethod.configs[attribute].deleting = true;

                const response = await deleteApi(deleteUrl);

                if (response.status == 200) {
                    paymentMethod.configs[attribute] = { filePath: null, uploaded: false };
                } else {
                    throw new Error(`Failed to delete ${attribute}.`);
                }

                console.log(`✅ Successfully deleted ${attribute} for '${paymentMethod.name}'`);

            } catch (error) {
                console.error(`❌ Error deleting ${attribute} for '${paymentMethod.name}':`, error);
            } finally {
                paymentMethod.configs[attribute].deleting = false;
            }
        }
    },
    getters: {
        logo() {
            return this.store ? this.store._relationships.logo : null;
        },
        store() {
            return this.storeState.store;
        },
        totalSelectedPaymentMethods() {
            return this.paymentMethods.filter((paymentMethod) => paymentMethod.active).length;
        },
        hasSelectedPaymentMethods() {
            return this.totalSelectedPaymentMethods > 0;
        },
        hasAssociatedPaymentMethods() {
            return this.associatedPaymentMethods.length > 0;
        },
        hasChangedPaymentMethods() {
            return this.changedPaymentMethods.length > 0;
        },
        changedPaymentMethods() {
            return this.paymentMethods.filter((paymentMethod, index) => {
                return !isEqual(paymentMethod, this.originalPaymentMethods[index]);
            });
        },
        hasPaymentMethodValidationErrors() {
            return this.paymentMethodValidationErrors.length > 0;
        },
        paymentMethodValidationErrors() {
            return this.paymentMethods
                .filter(paymentMethod => paymentMethod.active)
                .flatMap(paymentMethod =>
                    paymentMethod.configSchema
                        .filter(configSchemaEntity => {
                            return this.checkIfPaymentMethodConfigSchemaEntityPassesCondition(configSchemaEntity, paymentMethod.configs);
                        })
                        .map(configSchemaEntity => {
                            return this.getPaymentMethodFirstValidationError(configSchemaEntity, paymentMethod.configs);
                        })
                        .filter(error => error !== null)
                );
        },
        totalSelectedPaymentMethods() {
            return this.paymentMethods.filter((paymentMethod) => paymentMethod.active).length;
        },
        hasSelectedPaymentMethods() {
            return this.totalSelectedPaymentMethods > 0;
        },
        progressPercentage() {
            return this.totalCompletionSteps === 0 ? 0 : Math.round((this.totalCompletedSteps / this.totalCompletionSteps) * 100);
        },
        totalUploads() {

            return this.changedPaymentMethods.reduce((sum, paymentMethod) => {

                return sum + paymentMethod.configSchema.filter(configSchemaEntity => {
                    return paymentMethod.configs[configSchemaEntity.attribute] &&
                           paymentMethod.configs[configSchemaEntity.attribute].filePath &&
                           paymentMethod.configs[configSchemaEntity.attribute].hasOwnProperty('uploaded');
                }).length;

            }, 0);

        },
        totalFailedUploads() {
            return this.changedPaymentMethods.reduce((sum, paymentMethod) => {
                return sum + paymentMethod.configSchema.filter(configSchemaEntity => {
                    const config = paymentMethod.configs[configSchemaEntity.attribute];

                    // Ensure config exists, has a filePath, and was NOT uploaded successfully
                    return config?.filePath?.startsWith("blob:") && config.uploaded === false;
                }).length;
            }, 0);
        },
        totalCompletionSteps() {
            return this.changedPaymentMethods.filter((paymentMethod) => {

                if(paymentMethod._links) {
                    return true;
                }else if(paymentMethod.active) {
                    return true;
                }

                return false;

            }).length + this.totalUploads;
        },
        hasCompletedSteps() {
            return this.totalCompletedSteps > 0;
        },
        hasFailedUploads() {
            return this.totalFailedUploads > 0;
        }
    }
})
