<template>

    <div>
        <DeliveryMethods></DeliveryMethods>
        <DeliveryMethodScedule></DeliveryMethodScedule>
        <DeliveryMethodMap></DeliveryMethodMap>
    </div>

</template>

<script>

import DeliveryMethods from '@Pages/shopping/components/DeliveryMethods.vue';
import DeliveryMethodMap from '@Pages/shopping/components/DeliveryMethodMap.vue';
import DeliveryMethodScedule from '@Pages/shopping/components/DeliveryMethodScedule.vue';

export default {
    components: { DeliveryMethods, DeliveryMethodMap, DeliveryMethodScedule }
};
</script>
