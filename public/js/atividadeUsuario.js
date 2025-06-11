function registrarAtividade(idActivity) {
    const idUsuario = localStorage.USER_ID;
    const fkEnterprise = localStorage.EMPRESA_ID;
    console.log({ idUsuario, fkEnterprise, idActivity });
    if (!idUsuario || !fkEnterprise || !idActivity) return;

    fetch("http://localhost:4585/save-activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userActivityId: {
                fkEnterprise: Number(fkEnterprise),
                userId: Number(idUsuario),
                idActivity: Number(idActivity)
            },
        })
    })
        .then(async r => {
            const text = await r.text();
            try {
                return JSON.parse(text);
            } catch {
                return { error: text };
            }
        })
        .then(console.log)
        .catch(console.error);
}
