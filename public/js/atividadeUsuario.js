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
                dtActivity: new Date().toISOString(),
                fkEnterprise: Number(fkEnterprise),
                userId: Number(idUsuario),
                idActivity: Number(idActivity)
            },
        })
    })
        .then(r => r.json())
        .then(console.log)
        .catch(console.error);
}
