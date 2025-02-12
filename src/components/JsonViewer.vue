<script setup>
import { ref, watchEffect, onMounted } from "vue";

const props = defineProps({
    jsonText: Object, // Recebe o JSON como prop
});

onMounted(() => {
    // console.log('props: ', JSON?.parse(JSON?.stringify(props.jsonText)))
})

const formattedJson = ref("");

const getInlineStyles = () => ({
    key: 'color: #ffb86c;',
    string: 'color: #50fa7b;',
    number: 'color: #bd93f9;',
    boolean: 'color: #8be9fd;',
    null: 'color: #ff5555;'
});

const syntaxHighlight = (jsontext) => {
    if(!jsontext) return 

    let json = JSON?.parse(JSON?.stringify(jsontext))

    const styles = getInlineStyles();

    if (typeof json !== "string") {
        json = JSON.stringify(json, null, 2);
    }

    json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    return json.replace(
        /("(\\u[\da-fA-F]{4}|\\[^u"]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(\.\d+)?([eE][+-]?\d+)?)/g,
        (match) => {
            let cls = "";
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = styles.key;
                } else {
                    cls = styles.string;
                }
            } else if (/true|false/.test(match)) {
                cls = styles.boolean;
            } else if (/null/.test(match)) {
                cls = styles.null;
            } else {
                cls = styles.number;
            }
            return `<span style="${cls}">${match}</span>`;
        }
    );
};


// Atualiza a formatação quando o JSON mudar
watchEffect(() => {
    formattedJson.value = syntaxHighlight(props.jsonText);
});
</script>

<template>
    <pre v-html="formattedJson" class="json-container"></pre>
</template>


<style module>
/* Fundo do bloco JSON */
pre {
    background: #282a36;
    /* Fundo escuro clássico do Dracula */
    color: #f8f8f2;
    /* Texto padrão */
    padding: 16px;
    border-radius: 8px;
    overflow-x: auto;
    font-family: "Fira Code", monospace;
    /* Fonte monoespaçada */
    font-size: 10px;
    line-height: 1.5;
    white-space: pre-wrap;
    /* Quebra de linha automática */
    /* word-wrap: break-word; */
    border: 1px solid #44475a;
    /* Borda sutil */
}

.json-container span {
    color: inherit;
}

.json-key {
    color: #ffb86c;
}

.json-string {
    color: #50fa7b;
}

.json-number {
    color: #bd93f9;
}

.json-boolean {
    color: #8be9fd;
}

.json-null {
    color: #ff5555;
}
</style>
