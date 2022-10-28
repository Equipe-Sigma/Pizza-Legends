window.Actions = {
    d001: {
        name: "Whomp!",
        success: [
            { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
            { type: "animation", animation: "spin" },
            { type: "stateChange", damage: 10 }
        ]
    },
    s001: {
        name: "Tomato Squeeze!",
        targetType: "friendly",
        success: [
            { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
            { type: "stateChange", status: { type: "saucy", expireIn: 3 }}
        ]
    },
    c001: {
        name: "Olive Oil",
        success: [
            { type: "textMessage", text: "{CASTER} uses {ACTION}!" },
            { type: "animation", animation: "glob", color: "#dafd2a" },
            { type: "stateChange", status: { type: "clumsy", expireIn: 3 }},
            { type: "textMessage", text: "{TARGET} is slipping all around!"}
        ]
    }
}