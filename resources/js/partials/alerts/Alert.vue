<template>
    <!--
        Component Referece: https://flowbite.com/docs/components/alerts/
     -->
    <div :class="alertClass" role="alert">
        <slot></slot>
    </div>
</template>

  <script>

    export default {
        props: {
            type: {
                type: String,
                default: 'info',
                options: ['info', 'light', 'warning', 'danger']
            }
        },
        computed: {
            alertClass() {
                let classes = ['p-4 text-sm rounded-lg overflow-hidden'];

                if(this.type == 'info') {
                    classes.push('text-blue-800 bg-blue-50');
                }else if(this.type == 'light') {
                    classes.push('text-gray-800 bg-gray-50');
                }else if(this.type == 'warning') {
                    classes.push('text-yellow-800 bg-yellow-50');
                }else if(this.type == 'danger') {
                    classes.push('text-red-800 bg-red-50');
                }

                return classes;
            }
        }
    };

  </script>
