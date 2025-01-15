export const ShoppingCartMixin = {
    methods: {

        validateQuantityInput(event) {
            const value = event.target.value;

            if (!/^\d+$/.test(value)) {
                event.target.value = value.replace(/[^\d]/g, ''); // Allow only digits
            }
        }

    }
  };
