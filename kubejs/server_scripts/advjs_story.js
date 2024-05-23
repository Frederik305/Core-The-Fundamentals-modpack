/*AdvJSEvents.advancement(event => {
    const { TRIGGER } = event;

    const story = event
        .create("advjs:story")
        .display(displayBuilder => {
            displayBuilder.setIcon("grass_block")
            displayBuilder.setTitle(Text.translate("advancements.story.root.title"))
            displayBuilder.setDescription(Text.translate("advancements.story.root.description"))
            displayBuilder.setBackground("textures/gui/advancements/backgrounds/stone.png")
            displayBuilder.setShowToast(false)
            displayBuilder.setAnnounceToChat(false)
        })
        .criteria(criteriaBuilder => {
            criteriaBuilder.add("crafting_table", TRIGGER.hasItems("crafting_table"))
        });

    const mine_stone = story
        .addChild("mine_stone", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("wooden_pickaxe")
                    displayBuilder.setTitle(Text.translate("advancements.story.mine_stone.title"))
                    displayBuilder.setDescription(Text.translate("advancements.story.mine_stone.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("get_stone", TRIGGER.hasItems("#minecraft:stone_tool_materials"))
                })
        });

    const upgrade_tools = mine_stone
        .addChild("upgrade_tools", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("stone_pickaxe")
                    displayBuilder.setTitle(Text.translate("advancements.story.upgrade_tools.title"))
                    displayBuilder.setDescription(Text.translate("advancements.story.upgrade_tools.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("stone_pickaxe", TRIGGER.hasItems("stone_pickaxe"))
                })
        });

    const smelt_iron = upgrade_tools
        .addChild("smelt_iron", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("iron_ingot")
                    displayBuilder.setTitle(Text.translate("advancements.story.smelt_iron.title"))
                    displayBuilder.setDescription(Text.translate("advancements.story.smelt_iron.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("iron", TRIGGER.hasItems("iron_ingot"))
                })
        });

    const iron_tools = smelt_iron
        .addChild("iron_tools", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("iron_pickaxe")
                    displayBuilder.setTitle(Text.translate("advancements.story.iron_tools.title"))
                    displayBuilder.setDescription(Text.translate("advancements.story.iron_tools.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("iron_pickaxe", TRIGGER.hasItems("iron_pickaxe"))
                })
        });

    const mine_diamond = iron_tools
        .addChild("mine_diamond", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("diamond")
                    displayBuilder.setTitle(Text.translate("advancements.story.mine_diamond.title"))
                    displayBuilder.setDescription(Text.translate("advancements.story.mine_diamond.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("diamond", TRIGGER.hasItems("diamond"))
                })
        });

    const lava_bucket = smelt_iron
        .addChild("lava_bucket", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("lava_bucket")
                    displayBuilder.setTitle(Text.translate("advancements.story.lava_bucket.title"))
                    displayBuilder.setDescription(Text.translate("advancements.story.lava_bucket.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("lava_bucket", TRIGGER.hasItems("lava_bucket"))
                })
        });

    const obtain_armor = smelt_iron
        .addChild("obtain_armor", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("iron_chestplate")
                    //displayBuilder.setIcon("diamond_sword")
                    displayBuilder.setTitle(Text.translate("advancements.story.obtain_armor.title"))
                    displayBuilder.setDescription(Text.translate("advancements.story.obtain_armor.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.setStrategy(RequirementsStrategy.OR)
                    criteriaBuilder.add("iron_helmet", TRIGGER.hasItems("iron_helmet"))
                    criteriaBuilder.add("iron_chestplate", TRIGGER.hasItems("iron_chestplate"))
                    criteriaBuilder.add("iron_leggings", TRIGGER.hasItems("iron_leggings"))
                    criteriaBuilder.add("iron_boots", TRIGGER.hasItems("iron_boots"))
                })
        });

    mine_diamond
        .addChild("enchant_item", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("enchanted_book")
                    displayBuilder.setTitle(Text.translate("advancements.story.enchant_item.title"))
                    displayBuilder.setDescription(Text.translate("advancements.story.enchant_item.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("enchanted_item", TRIGGER.enchantedItem(triggerBuilder => { }))
                })
        });

    const form_obsidian = lava_bucket
        .addChild("form_obsidian", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("obsidian")
                    displayBuilder.setTitle(Text.translate("advancements.story.form_obsidian.title"))
                    displayBuilder.setDescription(Text.translate("advancements.story.form_obsidian.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("obsidian", TRIGGER.hasItems("obsidian"))
                })
        })

    obtain_armor
        .addChild("deflect_arrow", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("shield")
                    displayBuilder.setTitle(Text.translate("advancements.story.deflect_arrow.title"))
                    displayBuilder.setDescription(Text.translate("advancements.story.deflect_arrow.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("deflected_projectile", TRIGGER.entityHurtPlayer(triggerBuilder => {
                        triggerBuilder.setDamage(damagePredicateBuilder => {
                            damagePredicateBuilder.setType(damageSourcePredicateBuilder => {
                                damageSourcePredicateBuilder.setTag("is_projectile")
                            })
                            damagePredicateBuilder.isBlocked(true)
                        })
                    }))
                })
        });

    mine_diamond
        .addChild("shiny_gear", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("diamond_chestplate")
                    displayBuilder.setTitle(Text.translate("advancements.story.shiny_gear.title"))
                    displayBuilder.setDescription(Text.translate("advancements.story.shiny_gear.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.setStrategy(RequirementsStrategy.OR)
                    criteriaBuilder.add("diamond_helmet", TRIGGER.hasItems("diamond_helmet"))
                    criteriaBuilder.add("diamond_chestplate", TRIGGER.hasItems("diamond_chestplate"))
                    criteriaBuilder.add("diamond_leggings", TRIGGER.hasItems("diamond_leggings"))
                    criteriaBuilder.add("diamond_boots", TRIGGER.hasItems("diamond_boots"))
                })
        });

    const enter_the_nether = form_obsidian
        .addChild("enter_the_nether", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("flint_and_steel")
                    displayBuilder.setTitle(Text.translate("advancements.story.enter_the_nether.title"))
                    displayBuilder.setDescription(Text.translate("advancements.story.enter_the_nether.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("entered_nether", TRIGGER.changedDimension(triggerBuilder => {
                        triggerBuilder.setTo("the_nether")
                    }))
                })
        });

    enter_the_nether
        .addChild("cure_zombie_villager", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("golden_apple")
                    displayBuilder.setTitle(Text.translate("advancements.story.cure_zombie_villager.title"))
                    displayBuilder.setDescription(Text.translate("advancements.story.cure_zombie_villager.description"))
                    displayBuilder.setFrameType(FrameType.GOAL)
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("cured_zombie", TRIGGER.curedZombieVillager(triggerBuilder => { }))
                })
        });

    const follow_ender_eye = enter_the_nether
        .addChild("follow_ender_eye", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("ender_eye")
                    displayBuilder.setTitle(Text.translate("advancements.story.follow_ender_eye.title"))
                    displayBuilder.setDescription(Text.translate("advancements.story.follow_ender_eye.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("in_stronghold", TRIGGER.location(triggerBuilder => {
                        triggerBuilder.setLocation(locationPredicateBuilder => {
                            locationPredicateBuilder.setStructure("stronghold")
                        })
                    }))
                })
        });

    follow_ender_eye
        .addChild("enter_the_end", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("end_stone")
                    displayBuilder.setTitle(Text.translate("advancements.story.enter_the_end.title"))
                    displayBuilder.setDescription(Text.translate("advancements.story.enter_the_end.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("entered_end", TRIGGER.changedDimension(triggerBuilder => {
                        triggerBuilder.setTo("the_end")
                    }))
                })
        });
})*/
