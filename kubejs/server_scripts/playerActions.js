// Listen for advancement events
PlayerEvents.advancement(event => {
    // Access the advancement object and call its id function to get the ID string
    const advancement = event.advancement;
    const advancementId = String(advancement.id());

    // Log to console for debugging purposes
    console.log(`Advancement achieved by ${event.entity.name}: ${advancementId}`);

    // Send a message to the player with the advancement ID
    //event.entity.tell(`Advancement achieved: ${advancementId}`);
    
    // Check if the advancement ID starts with "minecraft:"
    if (!advancementId.includes("recipes")) {
        // Access the player entity
        const player = event.entity;
        
        // Your code to give the player an item
        //player.give(Item.of('numismatics:sprocket', 1));
        Utils.server.runCommandSilent(`numismatics pay ${player.name.getString()} 1 SPROCKET`);
    }
});