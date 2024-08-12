export default () => {
    return {
        enforce: 'pre',
        name: 'markdown-demo',
        transform(src, id) {
            if (id.endsWith('.md') && /^===/gm.test(src)) {
                const codes: [string, string][] = [];
                const code = src.replace(/^=== (.+)/gm, (_, t1) => {
                    const key = Math.random().toString().replace('.', '');
                    codes.push([key, t1]);
                    const code = `<C${key}></C${key}>`;
                    return code;
                });
                return (
                    code +           
                    `<script setup>
                    ${codes
                        .map(([key, t1]) => {
                            return `import C${key} from '${t1}';`;
                        })
                        .join('\n')}
                    </script>`
                );
            }
        },
    };
};
