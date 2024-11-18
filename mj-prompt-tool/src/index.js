import './scss/index.scss'

import { createApp, ref, nextTick, onMounted, computed } from 'vue';

const vm = createApp({
    setup() {
        const styles = ref({}); // 用於儲存 JSON 資料
        const test = ref("test");

        // 在組件掛載後載入 JSON
        onMounted(async () => {
            try {
                const response = await fetch('./data/style.json'); // 載入 style.json
                if (!response.ok) {
                    throw new Error('Failed to load JSON file');
                }
                styles.value = await response.json(); // 解析 JSON 並儲存到 styles
            } catch (error) {
                console.error(error);
            }
            console.log(styles.value);
            console.log(test.value);
        });

        return {
            styles,
            test
        };
    }
});

vm.mount('#app');

