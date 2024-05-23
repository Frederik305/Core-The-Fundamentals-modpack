ServerEvents.recipes(event => {
    // CREATE RECIPES
    event.recipes.create.compacting('numismatics:bevel', ['8x fundamentals:diamond_shard', '4x minecraft:emerald']);
    event.recipes.create.milling('2x fundamentals:diamond_chunk', 'minecraft:diamond')
    event.recipes.create.crushing(['2x fundamentals:diamond_shard', Item.of('1x fundamentals:diamond_shard').withChance(0.5), Item.of('2x fundamentals:diamond_shard').withChance(0.3), Item.of('3x fundamentals:diamond_shard').withChance(0.1)], 'fundamentals:diamond_chunk')

    // VANILLA RECIPES
    event.remove({ output: 'naturescompass:naturescompass' })
    event.remove({ output: 'explorerscompass:explorerscompass' })
    event.remove({ output: 'ironfurnaces:million_furnace' })
    event.remove({ output: 'ironfurnaces:netherite_furnace' })
    event.remove({ output: 'ironfurnaces:upgrade_netherite' })

    event.shaped('naturescompass:naturescompass',
        [
        'ABC',
        'DEF',
        'GHI'
        ], {
            A: 'minecraft:glow_berries',
            B: 'minecraft:sweet_berries',
            C: 'ars_nouveau:sourceberry_bush',

            D: 'create:chocolate_glazed_berries',
            E: 'fundamentals:diamond_compass',
            F: 'berries_and_cherries:strawberry',

            G: 'berries_and_cherries:raspberry',
            H: 'berries_and_cherries:blueberry',
            I: 'coffee_delight:coffee_berries',
        }
    )

    event.shaped('fundamentals:diamond_compass',
    [
        ' A ',
        'ABA',
        ' A '
        ], {
            A: 'minecraft:diamond',
            B: 'minecraft:compass',
        }
    )

    event.shaped('explorerscompass:explorerscompass',
    [
        ' A ',
        'ABA',
        ' A '
        ], {
            A: 'minecraft:netherite_ingot',
            B: 'minecraft:nether_star',
        }
    )

    event.shapeless('musicaldiscs:weed',
        [
            '3x minecraft:paper', 
            'minecraft:redstone'
        ]
    )
});