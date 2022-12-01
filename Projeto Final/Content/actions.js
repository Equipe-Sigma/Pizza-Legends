window.Actions = {
    damage1: {
      name: "Mordida!",
      description: "Só um pouquinho",
      success: [
        { type: "textMessage", text: "{CASTER} usa {ACTION}!"},
        { type: "animation", animation: "spin"},
        { type: "stateChange", damage: 10}
      ]
    },
    saucyStatus: {
      name: "Espremedor de Tomates",
      description: "Aplica um tempero picante.",
      targetType: "friendly",
      success: [
        { type: "textMessage", text: "{CASTER} usa {ACTION}!"},
        { type: "stateChange", status: { type: "saucy", expiresIn: 3 } }
      ]
    },
    clumsyStatus: {
      name: "Azeite de Oliva",
      description: "Escorregando deliciosamente!",
      success: [
        { type: "textMessage", text: "{CASTER} uses {ACTION}!"},
        { type: "animation", animation: "glob", color: "#dafd2a" },
        { type: "stateChange", status: { type: "clumsy", expiresIn: 3 } },
        { type: "textMessage", text: "{TARGET} está escorregando para todos os lados!"},
      ]
    },
    //Items
    item_recoverStatus: {
      name: "Aquecimento",
      description: "Deixar quentinho",
      targetType: "friendly",
      success: [
        { type: "textMessage", text: "{CASTER} usa o {ACTION}!"},
        { type: "stateChange", status: null },
        { type: "textMessage", text: "Se sentindo quentinha!", },
      ]
    },
    item_recoverHp: {
      name: "Parmesão",
      targetType: "friendly",
      success: [
        { type:"textMessage", text: "{CASTER} jogou um pouco de {ACTION}!", },
        { type:"stateChange", recover: 10, },
        { type:"textMessage", text: "{CASTER} recuperou HP!", },
      ]
    },
  }