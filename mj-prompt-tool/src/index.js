import './scss/index.scss'

import { createApp, ref, onMounted } from 'vue';

const vm = createApp({
    setup() {
        const styles = ref({});
        const finalPrompt = ref("");
        const finalName = ref("");
        const selectedStyle = ref("style");

        function addPrompt(prompt, name) {
            finalPrompt.value += prompt + ", ";
            finalName.value += name + ", ";
        }

        function clearPrompt() {
            finalPrompt.value = "";
            finalName.value = "";
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
            document.getElementById('col-items').scrollTop = 0;
        }

        function copyToClipboard(content) {
            navigator.clipboard.writeText(content);
            alert(`已複製：${content}`);
        }

        onMounted(async () => {
            loadStyles(selectedStyle.value);
        });

        return {
            styles,
            finalPrompt,
            finalName,
            selectedStyle,
            addPrompt,
            clearPrompt,
            loadStyles,
            copyToClipboard
        };
    }
});

vm.mount('#app');
