/*AdvJSEvents.advancement(event => {
    const { CONDITION, PROVIDER, TRIGGER } = event;

    const husbandry = event
        .create("advjs:husbandry")
        .display(displayBuilder => {
            displayBuilder.setIcon("hay_block")
            displayBuilder.setTitle(Text.translate("advancements.husbandry.root.title"))
            displayBuilder.setDescription(Text.translate("advancements.husbandry.root.description"))
            displayBuilder.setBackground("textures/gui/advancements/backgrounds/husbandry.png")
            displayBuilder.setShowToast(false)
            displayBuilder.setAnnounceToChat(false)
        })
        .criteria(criteriaBuilder => {
            criteriaBuilder.add("consumed_item", TRIGGER.consumeItem(triggerBuilder => { }))
        });

    const plant_seed = husbandry
        .addChild("plant_seed", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("wheat")
                    displayBuilder.setTitle(Text.translate("advancements.husbandry.plant_seed.title"))
                    displayBuilder.setDescription(Text.translate("advancements.husbandry.plant_seed.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.setStrategy(RequirementsStrategy.OR)
                    const plants = [
                        "wheat", "pumpkin_stem", "melon_stem", "beetroots",
                        "nether_wart", "torchflower", "pitcher_pod"
                    ];
                    plants.forEach(plant => {
                        criteriaBuilder.add(plant, TRIGGER.placedBlock(triggerBuilder => {
                            triggerBuilder.addCondition(CONDITION.blockStateProperty(plant))
                        }))
                    })
                })
        });

    const breed_an_animal = husbandry
        .addChild("breed_an_animal", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("wheat")
                    displayBuilder.setTitle(Text.translate("advancements.husbandry.breed_an_animal.title"))
                    displayBuilder.setDescription(Text.translate("advancements.husbandry.breed_an_animal.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("bred", TRIGGER.bredAnimals(triggerBuilder => { }))
                })
        });

    breed_an_animal
        .addChild("breed_all_animals", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("golden_carrot")
                    displayBuilder.setTitle(Text.translate("advancements.husbandry.breed_all_animals.title"))
                    displayBuilder.setDescription(Text.translate("advancements.husbandry.breed_all_animals.description"))
                    displayBuilder.setFrameType(FrameType.CHALLENGE)
                })
                .criteria(criteriaBuilder => {
                    PROVIDER.getBreedableAnimals().forEach(entity => {
                        criteriaBuilder.add(entity.toString(), TRIGGER.bredAnimals(triggerBuilder => {
                            triggerBuilder.setChildByType(entity)
                        }))
                    })
                    PROVIDER.getIndirectlyBreedableAnimals().forEach(entity => {
                        criteriaBuilder.add(entity.toString(), TRIGGER.bredAnimals(triggerBuilder => {
                            triggerBuilder.setParentByType(entity)
                            triggerBuilder.setPartnerByType(entity)
                        }))
                    })
                })
                .rewards(rewardsBuilder => rewardsBuilder.setExperience(100))
        });

    plant_seed
        .addChild("balanced_diet", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("apple")
                    displayBuilder.setTitle(Text.translate("advancements.husbandry.balanced_diet.title"))
                    displayBuilder.setDescription(Text.translate("advancements.husbandry.balanced_diet.description"))
                    displayBuilder.setFrameType(FrameType.CHALLENGE)
                })
                .criteria(criteriaBuilder => {
                    PROVIDER.getEdibleItems().forEach(item => {
                        criteriaBuilder.add(item.toString(), TRIGGER.usedItem(item))
                    })
                })
                .rewards(rewardsBuilder => rewardsBuilder.setExperience(100))
        });

    plant_seed
        .addChild("obtain_netherite_hoe", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("netherite_hoe")
                    displayBuilder.setTitle(Text.translate("advancements.husbandry.netherite_hoe.title"))
                    displayBuilder.setDescription(Text.translate("advancements.husbandry.netherite_hoe.description"))
                    displayBuilder.setFrameType(FrameType.CHALLENGE)
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("netherite_hoe", TRIGGER.hasItems("netherite_hoe"))
                })
                .rewards(rewardsBuilder => rewardsBuilder.setExperience(100))
        });

    const tame_an_animal = husbandry
        .addChild("tame_an_animal", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("lead")
                    displayBuilder.setTitle(Text.translate("advancements.husbandry.tame_an_animal.title"))
                    displayBuilder.setDescription(Text.translate("advancements.husbandry.tame_an_animal.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("tamed_animal", TRIGGER.tameAnimal(triggerBuilder => { }))
                })
        });

    const fishy_business = husbandry
        .addChild("fishy_business", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("fishing_rod")
                    displayBuilder.setTitle(Text.translate("advancements.husbandry.fishy_business.title"))
                    displayBuilder.setDescription(Text.translate("advancements.husbandry.fishy_business.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.setStrategy(RequirementsStrategy.OR)
                    PROVIDER.getFish().forEach(item => {
                        criteriaBuilder.add(item.toString(), TRIGGER.fishingRodHooked(triggerBuilder => {
                            triggerBuilder.setRod(item)
                        }))
                    })
                })
        });

    const tactical_fishing = fishy_business
        .addChild("tactical_fishing", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("pufferfish_bucket")
                    displayBuilder.setTitle(Text.translate("advancements.husbandry.tactical_fishing.title"))
                    displayBuilder.setDescription(Text.translate("advancements.husbandry.tactical_fishing.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.setStrategy(RequirementsStrategy.OR)
                    PROVIDER.getFish().forEach(item => {
                        criteriaBuilder.add(item.toString(), TRIGGER.filledBucket(item))
                    })
                })
        });

    const axolotl_in_a_bucket = tactical_fishing
        .addChild("axolotl_in_a_bucket", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("axolotl_bucket")
                    displayBuilder.setTitle(Text.translate("advancements.husbandry.axolotl_in_a_bucket.title"))
                    displayBuilder.setDescription(Text.translate("advancements.husbandry.axolotl_in_a_bucket.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("axolotl_bucket", TRIGGER.filledBucket("axolotl_bucket"))
                })
        });

    axolotl_in_a_bucket
        .addChild("kill_axolotl_target", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("tropical_fish_bucket")
                    displayBuilder.setTitle(Text.translate("advancements.husbandry.kill_axolotl_target.title"))
                    displayBuilder.setDescription(Text.translate("advancements.husbandry.kill_axolotl_target.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("kill_axolotl_target", TRIGGER.effectChanged(triggerBuilder => {
                        triggerBuilder.setSourceByType("axolotl")
                    }))
                })
        });

    tame_an_animal
        .addChild("complete_catalogue", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("cod")
                    displayBuilder.setTitle(Text.translate("advancements.husbandry.complete_catalogue.title"))
                    displayBuilder.setDescription(Text.translate("advancements.husbandry.complete_catalogue.description"))
                    displayBuilder.setFrameType(FrameType.CHALLENGE)
                })
                .criteria(criteriaBuilder => {
                    PROVIDER.getCatVariants().forEach(variant => {
                        criteriaBuilder.add(variant.toString(), TRIGGER.tameAnimal(triggerBuilder => {
                            triggerBuilder.setEntity(entityPredicateBuilder => {
                                entityPredicateBuilder.setTypeSpecific(entityPredicateBuilder.SPECIFIC.cat(variant.path))
                            })
                        }))
                    })
                })
                .rewards(rewardsBuilder => rewardsBuilder.setExperience(50))
        });

    const safely_harvest_honey = husbandry
        .addChild("safely_harvest_honey", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("honey_bottle")
                    displayBuilder.setTitle(Text.translate("advancements.husbandry.safely_harvest_honey.title"))
                    displayBuilder.setDescription(Text.translate("advancements.husbandry.safely_harvest_honey.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("safely_harvest_honey", TRIGGER.itemUsedOnBlock(triggerBuilder => {
                        const location = CONDITION
                            .locationCheck()
                            .location(locationPredicateBuilder => {
                                locationPredicateBuilder.setBlockByType("beehives")
                                locationPredicateBuilder.setSmokey(true)
                            });
                        const item = CONDITION.matchTool(itemPredicateBuilder => itemPredicateBuilder.of("glass_bottle"))
                        triggerBuilder.addConditions(location, item)
                    }))
                })
        });

    const waxables = [
        "copper_block", "exposed_copper", "weathered_copper", "oxidized_copper",
        "cut_copper", "exposed_cut_copper", "weathered_cut_copper", "oxidized_cut_copper",
        "cut_copper_slab", "exposed_cut_copper_slab", "weathered_cut_copper_slab",
        "oxidized_cut_copper_slab", "cut_copper_stairs", "exposed_cut_copper_stairs",
        "weathered_cut_copper_stairs", "oxidized_cut_copper_stairs"
    ];

    const wax_on = safely_harvest_honey
        .addChild("wax_on", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("honey_bottle")
                    displayBuilder.setTitle(Text.translate("advancements.husbandry.wax_on.title"))
                    displayBuilder.setDescription(Text.translate("advancements.husbandry.wax_on.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("wax_on", TRIGGER.itemUsedOnBlock(triggerBuilder => {
                        const location = CONDITION
                            .locationCheck()
                            .location(locationPredicateBuilder => {
                                locationPredicateBuilder.setBlockByType(waxables)
                            });
                        const item = CONDITION.matchTool(itemPredicateBuilder => itemPredicateBuilder.of("honeycomb"));
                        triggerBuilder.addConditions(location, item)
                    }))
                })
        });

    wax_on
        .addChild("wax_off", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("stone_axe")
                    displayBuilder.setTitle(Text.translate("advancements.husbandry.wax_off.title"))
                    displayBuilder.setDescription(Text.translate("advancements.husbandry.wax_off.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("wax_off", TRIGGER.itemUsedOnBlock(triggerBuilder => {
                        const location = CONDITION
                            .locationCheck()
                            .location(locationPredicateBuilder => {
                                locationPredicateBuilder.setBlockByType(waxables.map(block => "waxed_" + block))
                            });
                        const item = CONDITION.matchTool(itemPredicateBuilder => itemPredicateBuilder.of("honeycomb"));
                        triggerBuilder.addConditions(location, item)
                    }))
                })
        });

    const tadpole_in_a_bucket = husbandry
        .addChild("tadpole_in_a_bucket", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("tadpole_bucket")
                    displayBuilder.setTitle(Text.translate("advancements.husbandry.tadpole_in_a_bucket.title"))
                    displayBuilder.setDescription(Text.translate("advancements.husbandry.tadpole_in_a_bucket.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("tadpole_bucket", TRIGGER.filledBucket("tadpole_bucket"))
                })
        });

    const leash_all_frog_variants = tadpole_in_a_bucket
        .addChild("leash_all_frog_variants", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("lead")
                    displayBuilder.setTitle(Text.translate("advancements.husbandry.leash_all_frog_variants.title"))
                    displayBuilder.setDescription(Text.translate("advancements.husbandry.leash_all_frog_variants.description"))
                })
                .criteria(criteriaBuilder => {
                    const frogVariants = ["temperate", "warm", "cold"];
                    frogVariants.forEach(variant => {
                        criteriaBuilder.add(variant, TRIGGER.playerInteract(triggerBuilder => {
                            triggerBuilder.setItem("lead")
                            triggerBuilder.setEntity(entityPredicateBuilder => {
                                entityPredicateBuilder.of("frog")
                                entityPredicateBuilder.setTypeSpecific(entityPredicateBuilder.SPECIFIC.frog(variant))
                            })
                        }))
                    })
                })
        });

    leash_all_frog_variants
        .addChild("froglights", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("verdant_froglight")
                    displayBuilder.setTitle(Text.translate("advancements.husbandry.froglights.title"))
                    displayBuilder.setDescription(Text.translate("advancements.husbandry.froglights.description"))
                    displayBuilder.setFrameType(FrameType.CHALLENGE)
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("froglights", TRIGGER.hasItems(["ochre_froglight", "pearlescent_froglight", "verdant_froglight"]))
                })
        });

    husbandry
        .addChild("silk_touch_nest", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("bee_nest")
                    displayBuilder.setTitle(Text.translate("advancements.husbandry.silk_touch_nest.title"))
                    displayBuilder.setDescription(Text.translate("advancements.husbandry.silk_touch_nest.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("silk_touch_nest", TRIGGER.beeNestDestroyed(triggerBuilder => {
                        triggerBuilder.setBlock("bee_nest")
                        triggerBuilder.setItem(itemPredicateBuilder => {
                            itemPredicateBuilder.hasEnchantment(enchantmentPredicateBuilder => {
                                enchantmentPredicateBuilder.setEnchantment("silk_touch")
                                enchantmentPredicateBuilder.setLevel({ min: 1 })
                            })
                        })
                        triggerBuilder.setBounds(3)
                    }))
                })
        });

    husbandry
        .addChild("ride_a_boat_with_a_goat", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("oak_boat")
                    displayBuilder.setTitle(Text.translate("advancements.husbandry.ride_a_boat_with_a_goat.title"))
                    displayBuilder.setDescription(Text.translate("advancements.husbandry.ride_a_boat_with_a_goat.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("ride_a_boat_with_a_goat", TRIGGER.startRiding(triggerBuilder => {
                        triggerBuilder.setVehicle(entityPredicateBuilder => {
                            entityPredicateBuilder.of("boat")
                            entityPredicateBuilder.setPassengerByType("goat")
                        })
                    }))
                })
        });

    husbandry
        .addChild("make_a_sign_glow", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("glow_ink_sac")
                    displayBuilder.setTitle(Text.translate("advancements.husbandry.make_a_sign_glow.title"))
                    displayBuilder.setDescription(Text.translate("advancements.husbandry.make_a_sign_glow.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("make_a_sign_glow", TRIGGER.itemUsedOnBlock(triggerBuilder => {
                        const location = CONDITION
                            .locationCheck()
                            .location(locationPredicateBuilder => {
                                locationPredicateBuilder.setBlock(blockPredicateBuilder => {
                                    blockPredicateBuilder.ofTag("all_signs")
                                })
                            });
                        const item = CONDITION.matchTool(itemPredicateBuilder => itemPredicateBuilder.of("glow_ink_sac"));
                        triggerBuilder.addConditions(location, item)
                    }))
                })
        });

    const allay_deliver_item_to_player = husbandry
        .addChild("allay_deliver_item_to_player", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("cookie")
                    displayBuilder.setTitle(Text.translate("advancements.husbandry.allay_deliver_item_to_player.title"))
                    displayBuilder.setDescription(Text.translate("advancements.husbandry.allay_deliver_item_to_player.description"))
                    displayBuilder.setHidden(true)
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("allay_deliver_item_to_player", TRIGGER.itemPickedUpByPlayer(triggerBuilder => {
                        triggerBuilder.setEntityByType("allay")
                    }))
                })
        });

    allay_deliver_item_to_player
        .addChild("allay_deliver_cake_to_note_block", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("note_block")
                    displayBuilder.setTitle(Text.translate("advancements.husbandry.allay_deliver_cake_to_note_block.title"))
                    displayBuilder.setDescription(Text.translate("advancements.husbandry.allay_deliver_cake_to_note_block.description"))
                    displayBuilder.setHidden(true)
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("allay_deliver_cake_to_note_block", TRIGGER.allayDropItemOnBlock(triggerBuilder => {
                        const location = CONDITION
                            .locationCheck()
                            .location(locationPredicateBuilder => {
                                locationPredicateBuilder.setBlockByType("note_block")
                            });
                        const item = CONDITION.matchTool(itemPickedUpByPlayer => itemPickedUpByPlayer.of("cake"));
                        triggerBuilder.addConditions(location, item)
                    }))
                })
        });

    const obtain_sniffer_egg = husbandry
        .addChild("obtain_sniffer_egg", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("sniffer_egg")
                    displayBuilder.setTitle(Text.translate("advancements.husbandry.obtain_sniffer_egg.title"))
                    displayBuilder.setDescription(Text.translate("advancements.husbandry.obtain_sniffer_egg.description"))
                    displayBuilder.setHidden(true)
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("obtain_sniffer_egg", TRIGGER.hasItems("sniffer_egg"))
                })
        });

    const feed_snifflet = obtain_sniffer_egg
        .addChild("feed_snifflet", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("torchflower_seeds")
                    displayBuilder.setTitle(Text.translate("advancements.husbandry.feed_snifflet.title"))
                    displayBuilder.setDescription(Text.translate("advancements.husbandry.feed_snifflet.description"))
                    displayBuilder.setHidden(true)
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("feed_snifflet", TRIGGER.playerInteract(triggerBuilder => {
                        triggerBuilder.setItem("#minecraft:sniffer_food")
                        triggerBuilder.setEntity(entityPredicateBuilder => {
                            entityPredicateBuilder.of("sniffer")
                            entityPredicateBuilder.setFlags(flagsPredicateBuilder => {
                                flagsPredicateBuilder.isBaby(true)
                            })
                        })
                    }))
                })
        });

    feed_snifflet
        .addChild("plant_any_sniffer_seed", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("pitcher_pod")
                    displayBuilder.setTitle(Text.translate("advancements.husbandry.plant_any_sniffer_seed.title"))
                    displayBuilder.setDescription(Text.translate("advancements.husbandry.plant_any_sniffer_seed.description"))
                    displayBuilder.setHidden(true)
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.setStrategy(RequirementsStrategy.OR)
                    criteriaBuilder.add("torchflower", TRIGGER.placedBlock(triggerBuilder => {
                        triggerBuilder.addCondition(CONDITION.blockStateProperty("torchflower_crop"))
                    }))
                    criteriaBuilder.add("pitcher_pod", TRIGGER.placedBlock(triggerBuilder => {
                        triggerBuilder.addCondition(CONDITION.blockStateProperty("pitcher_crop"))
                    }))
                })
        })
})*/
