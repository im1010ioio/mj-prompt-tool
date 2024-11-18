import './scss/index.scss'

import { createApp, ref, onMounted } from 'vue';

const vm = createApp({
    setup() {
        const styles = ref({});
        const finalPrompt = ref("");
        const selectedStyle = ref("style");

        function addPrompt(text) {
            finalPrompt.value += text + ", ";
        }

        function clearPrompt() {
            finalPrompt.value = "";
        }
        async function loadStyles(style) {
            try {
                const response = await fetch('./data/' + style + '.json');
                if (!response.ok) {
                    throw new Error('Failed to load JSON file');
                }
                styles.value = await response.json();
            } catch (error) {
                console.error(error);
            }
        }

        onMounted(async () => {
            loadStyles(selectedStyle.value);
        });

        return {
            styles,
            finalPrompt,
            selectedStyle,
            addPrompt,
            clearPrompt,
            loadStyles
        };
    }
});

vm.mount('#app');
