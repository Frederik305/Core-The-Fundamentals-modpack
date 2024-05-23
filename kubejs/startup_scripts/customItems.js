StartupEvents.registry('item', event => {
    event.create('fundamentals:diamond_shard')
        .displayName('Diamond Shard')
        //.tooltip('Ingredients')
        .maxStackSize(64)
        .texture('kubejs:item/diamond_shard');

    event.create('fundamentals:diamond_chunk')
        .displayName('Diamond Chunk')
        //.tooltip('Ingredients')
        .maxStackSize(64)
        .texture('kubejs:item/diamond_chunk');
        
    event.create('fundamentals:diamond_compass')
        .displayName('Diamond Compass')
        //.tooltip('Ingredients')
        .maxStackSize(64)
        .texture('kubejs:item/diamond_compass');
})