window.PizzaTypes = {
    normal: "normal",
    spicy: "spicy",
    veggie: "veggie",
    fungi: "fungi",
    chill: "chill",
  }
  
  window.Pizzas = {
    "s001": {
      name: "El Fuego del Diablo",
      type: PizzaTypes.spicy,
      src: "/images/characters/pizzas/s001.png",
      icon: "/images/icons/spicy.png",
      actions: [ "s001", "d001" ],
    },
    "v001": {
      name: "Santa Margueritta",
      type: PizzaTypes.veggie,
      src: "/images/characters/pizzas/v001.png",
      icon: "/images/icons/veggie.png",
      actions: [ "c001", "d001", "s001" ],
    },
    "f001": {
      name: "Portobello Express",
      type: PizzaTypes.fungi,
      src: "/images/characters/pizzas/f001.png",
      icon: "/images/icons/fungi.png",
      actions: [ "d001", "s001" ],
    }
  }