/*AdvJSEvents.advancement(event => {
    const { CONDITION, PREDICATE, PROVIDER, TRIGGER } = event;

    const nether = event
        .create("advjs:nether")
        .display(displayBuilder => {
            displayBuilder.setIcon("red_nether_bricks")
            displayBuilder.setTitle(Text.translate("advancements.nether.root.title"))
            displayBuilder.setDescription(Text.translate("advancements.nether.root.description"))
            displayBuilder.setBackground("textures/gui/advancements/backgrounds/nether.png")
            displayBuilder.setShowToast(false)
            displayBuilder.setAnnounceToChat(false)
        })
        .criteria(criteriaBuilder => {
            criteriaBuilder.add("entered_nether", TRIGGER.changedDimension(triggerBuilder => {
                triggerBuilder.setTo("the_nether")
            }))
        });

    const return_to_sender = nether
        .addChild("return_to_sender", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("fire_charge")
                    displayBuilder.setTitle(Text.translate("advancements.nether.return_to_sender.title"))
                    displayBuilder.setDescription(Text.translate("advancements.nether.return_to_sender.description"))
                    displayBuilder.setFrameType(FrameType.CHALLENGE)
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("killed_ghast", TRIGGER.playerKilledEntity(triggerBuilder => {
                        triggerBuilder.setKilledByType("ghast")
                        triggerBuilder.setKillingBlow(entityPredicateBuilder => {
                            entityPredicateBuilder.setTag("is_projectile")
                            entityPredicateBuilder.setDirectByType("fireball")
                        })
                    }))
                })
                .rewards(rewardsBuilder => rewardsBuilder.setExperience(50))
        });

    const find_fortress = nether
        .addChild("find_fortress", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("nether_bricks")
                    displayBuilder.setTitle(Text.translate("advancements.nether.find_fortress.title"))
                    displayBuilder.setDescription(Text.translate("advancements.nether.find_fortress.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("fortress", TRIGGER.location(triggerBuilder => {
                        triggerBuilder.setLocation(locationPredicateBuilder => {
                            locationPredicateBuilder.setStructure("fortress")
                        })
                    }))
                })
        });

    nether
        .addChild("fast_travel", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("map")
                    displayBuilder.setTitle(Text.translate("advancements.nether.fast_travel.title"))
                    displayBuilder.setDescription(Text.translate("advancements.nether.fast_travel.description"))
                    displayBuilder.setFrameType(FrameType.CHALLENGE)
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("travelled", TRIGGER.travelledThroughNether(triggerBuilder => {
                        triggerBuilder.setDistance(distancePredicateBuilder => {
                            distancePredicateBuilder.setHorizontal({ min: 7000 })
                        })
                    }))
                })
                .rewards(rewardsBuilder => rewardsBuilder.setExperience(100))
        });

    return_to_sender
        .addChild("uneasy_alliance", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("map")
                    displayBuilder.setTitle(Text.translate("advancements.nether.fast_travel.title"))
                    displayBuilder.setDescription(Text.translate("advancements.nether.fast_travel.description"))
                    displayBuilder.setFrameType(FrameType.CHALLENGE)
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("killed_ghast", TRIGGER.playerKilledEntity(triggerBuilder => {
                        triggerBuilder.setKilled(entityPredicateBuilder => {
                            entityPredicateBuilder.of("ghast")
                            entityPredicateBuilder.setLocation(locationPredicateBuilder => {
                                locationPredicateBuilder.setDimension("overworld")
                            })
                        })
                    }))
                })
                .rewards(rewardsBuilder => rewardsBuilder.setExperience(100))
        });

    const get_wither_skull = find_fortress
        .addChild("get_wither_skull", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("wither_skeleton_skull")
                    displayBuilder.setTitle(Text.translate("advancements.nether.get_wither_skull.title"))
                    displayBuilder.setDescription(Text.translate("advancements.nether.get_wither_skull.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("wither_skull", TRIGGER.hasItems("wither_skeleton_skull"))
                })
        });

    const summon_wither = get_wither_skull
        .addChild("summon_wither", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("nether_star")
                    displayBuilder.setTitle(Text.translate("advancements.nether.summon_wither.title"))
                    displayBuilder.setDescription(Text.translate("advancements.nether.summon_wither.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("summoned", TRIGGER.summonedEntity(triggerBuilder => {
                        triggerBuilder.setEntityByType("wither")
                    }))
                })
        });

    const obtain_blaze_rod = find_fortress
        .addChild("obtain_blaze_rod", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("blaze_rod")
                    displayBuilder.setTitle(Text.translate("advancements.nether.obtain_blaze_rod.title"))
                    displayBuilder.setDescription(Text.translate("advancements.nether.obtain_blaze_rod.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("blaze_rod", TRIGGER.hasItems("blaze_rod"))
                })
        });

    const create_beacon = summon_wither
        .addChild("create_beacon", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("beacon")
                    displayBuilder.setTitle(Text.translate("advancements.nether.create_beacon.title"))
                    displayBuilder.setDescription(Text.translate("advancements.nether.create_beacon.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("beacon", TRIGGER.constructedBeacon(triggerBuilder => {
                        triggerBuilder.setLevel({ min: 1 })
                    }))
                })
        });

    create_beacon
        .addChild("create_full_beacon", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("beacon")
                    displayBuilder.setTitle(Text.translate("advancements.nether.create_full_beacon.title"))
                    displayBuilder.setDescription(Text.translate("advancements.nether.create_full_beacon.description"))
                    displayBuilder.setFrameType(FrameType.GOAL)
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("beacon", TRIGGER.constructedBeacon(triggerBuilder => {
                        triggerBuilder.setLevel(4)
                    }))
                })
        });

    const brew_potion = obtain_blaze_rod
        .addChild("brew_potion", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("potion")
                    displayBuilder.setTitle(Text.translate("advancements.nether.brew_potion.title"))
                    displayBuilder.setDescription(Text.translate("advancements.nether.brew_potion.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("potion", TRIGGER.brewedPotion(triggerBuilder => { }))
                })
        });

    const potions = [
        "speed", "slowness", "strength", "jump_boost",
        "regeneration", "fire_resistance", "water_breathing",
        "invisibility", "night_vision", "weakness",
        "poison", "slow_falling", "resistance"
    ];

    const all_potions = brew_potion
        .addChild("all_potions", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("milk_bucket")
                    displayBuilder.setTitle(Text.translate("advancements.nether.all_potions.title"))
                    displayBuilder.setDescription(Text.translate("advancements.nether.all_potions.description"))
                    displayBuilder.setFrameType(FrameType.CHALLENGE)
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("all_effects", TRIGGER.effectChanged(triggerBuilder => {
                        triggerBuilder.setEffects(mobEffectsBuilder => {
                            potions.forEach(potion => mobEffectsBuilder.addEffectByPredicate(potion, PREDICATE.anyMobEffectInstance()))
                        })
                    }))
                })
                .rewards(rewardsBuilder => rewardsBuilder.setExperience(100))
        });

    all_potions
        .addChild("all_effects", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("bucket")
                    displayBuilder.setTitle(Text.translate("advancements.nether.all_effects.title"))
                    displayBuilder.setDescription(Text.translate("advancements.nether.all_effects.description"))
                    displayBuilder.setFrameType(FrameType.CHALLENGE)
                    displayBuilder.setHidden(true)
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("all_effects", TRIGGER.effectChanged(triggerBuilder => {
                        triggerBuilder.setEffects(mobEffectsBuilder => {
                            const effects = [
                                "wither", "haste", "mining_fatigue", "levitation",
                                "glowing", "absorption", "hunger", "nausea",
                                "conduit_power", "dolphins_grace", "blindness",
                                "bad_omen", "hero_of_the_village", "darkness"
                            ];
                            potions.forEach(potion => mobEffectsBuilder.addEffectByPredicate(potion, PREDICATE.anyMobEffectInstance()))
                            effects.forEach(effect => mobEffectsBuilder.addEffectByPredicate(effect, PREDICATE.anyMobEffectInstance()))
                        })
                    }))
                })
                .rewards(rewardsBuilder => rewardsBuilder.setExperience(1000))
        });

    const obtain_ancient_debris = nether
        .addChild("obtain_ancient_debris", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("ancient_debris")
                    displayBuilder.setTitle(Text.translate("advancements.nether.obtain_ancient_debris.title"))
                    displayBuilder.setDescription(Text.translate("advancements.nether.obtain_ancient_debris.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("ancient_debris", TRIGGER.hasItems("ancient_debris"))
                })
        });

    obtain_ancient_debris
        .addChild("netherite_armor", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("netherite_chestplate")
                    displayBuilder.setTitle(Text.translate("advancements.nether.netherite_armor.title"))
                    displayBuilder.setDescription(Text.translate("advancements.nether.netherite_armor.description"))
                    displayBuilder.setFrameType(FrameType.CHALLENGE)
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("netherite_armor", TRIGGER.hasItems([
                        "netherite_helmet",
                        "netherite_chestplate",
                        "netherite_leggings",
                        "netherite_boots"
                    ]))
                })
                .rewards(rewardsBuilder => rewardsBuilder.setExperience(100))
        });

    obtain_ancient_debris
        .addChild("use_lodestone", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("lodestone")
                    displayBuilder.setTitle(Text.translate("advancements.nether.use_lodestone.title"))
                    displayBuilder.setDescription(Text.translate("advancements.nether.use_lodestone.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("use_lodestone", TRIGGER.itemUsedOnBlock(triggerBuilder => {
                        const block = CONDITION.blockStateProperty("lodestone");
                        const item = CONDITION.matchTool(itemPredicateBuilder => itemPredicateBuilder.of("compass"));
                        triggerBuilder.addConditions(block, item)
                    }))
                })
        });

    const obtain_crying_obsidian = nether
        .addChild("obtain_crying_obsidian", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("crying_obsidian")
                    displayBuilder.setTitle(Text.translate("advancements.nether.obtain_crying_obsidian.title"))
                    displayBuilder.setDescription(Text.translate("advancements.nether.obtain_crying_obsidian.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("crying_obsidian", TRIGGER.hasItems("crying_obsidian"))
                })
        });

    obtain_crying_obsidian
        .addChild("charge_respawn_anchor", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("respawn_anchor")
                    displayBuilder.setTitle(Text.translate("advancements.nether.charge_respawn_anchor.title"))
                    displayBuilder.setDescription(Text.translate("advancements.nether.charge_respawn_anchor.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("charge_respawn_anchor", TRIGGER.itemUsedOnBlock(triggerBuilder => {
                        const block = CONDITION
                            .blockStateProperty("respawn_anchor")
                            .stateProperties(statePropertiesBuilder => {
                                statePropertiesBuilder.match("charge", "4")
                            });
                        const item = CONDITION.matchTool(itemPredicateBuilder => itemPredicateBuilder.of("glowstone"));
                        triggerBuilder.addConditions(block, item)
                    }))
                })
        });

    const ride_strider = nether
        .addChild("ride_strider", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("warped_fungus_on_a_stick")
                    displayBuilder.setTitle(Text.translate("advancements.nether.ride_strider.title"))
                    displayBuilder.setDescription(Text.translate("advancements.nether.ride_strider.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("used_warped_fungus_on_a_stick", TRIGGER.itemDurability(triggerBuilder => {
                        triggerBuilder.setPlayer(playerPredicateBuilder => {
                            playerPredicateBuilder.setVehicle(entityPredicateBuilder => {
                                entityPredicateBuilder.of("strider")
                            })
                        })
                        triggerBuilder.setItem("warped_fungus_on_a_stick")
                    }))
                })
        });

    ride_strider
        .addChild("ride_strider_in_overworld_lava", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("warped_fungus_on_a_stick")
                    displayBuilder.setTitle(Text.translate("advancements.nether.ride_strider_in_overworld_lava.title"))
                    displayBuilder.setDescription(Text.translate("advancements.nether.ride_strider_in_overworld_lava.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("ride_entity_distance", TRIGGER.rideEntityInLava(triggerBuilder => {
                        triggerBuilder.setPlayer(playerPredicateBuilder => {
                            playerPredicateBuilder.setLocation(locationPredicateBuilder => {
                                locationPredicateBuilder.setDimension("overworld")
                            })
                            playerPredicateBuilder.setVehicle(entityPredicateBuilder => {
                                entityPredicateBuilder.of("strider")
                            })
                        })
                        triggerBuilder.setDistance(distancePredicateBuilder => {
                            distancePredicateBuilder.setHorizontal({ min: 50 })
                        })
                    }))
                })
        });

    ride_strider
        .addChild("explore_nether", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("netherite_boots")
                    displayBuilder.setTitle(Text.translate("advancements.nether.explore_nether.title"))
                    displayBuilder.setDescription(Text.translate("advancements.nether.explore_nether.description"))
                    displayBuilder.setFrameType(FrameType.CHALLENGE)
                })
                .criteria(criteriaBuilder => {
                    PROVIDER.getNetherBiomes().forEach(biomeKey => {
                        criteriaBuilder.add(biomeKey.toString(), TRIGGER.location(triggerBuilder => {
                            triggerBuilder.setLocation(locationPredicateBuilder => {
                                locationPredicateBuilder.setBiome(biomeKey)
                            })
                        }))
                    })
                })
        });

    const find_bastion = nether
        .addChild("find_bastion", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("polished_blackstone_bricks")
                    displayBuilder.setTitle(Text.translate("advancements.nether.find_bastion.title"))
                    displayBuilder.setDescription(Text.translate("advancements.nether.find_bastion.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("bastion", TRIGGER.location(triggerBuilder => {
                        triggerBuilder.setLocation(locationPredicateBuilder => {
                            locationPredicateBuilder.setStructure("bastion_remnant")
                        })
                    }))
                })
        });

    find_bastion
        .addChild("loot_bastion", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("chest")
                    displayBuilder.setTitle(Text.translate("advancements.nether.loot_bastion.title"))
                    displayBuilder.setDescription(Text.translate("advancements.nether.loot_bastion.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.setStrategy(RequirementsStrategy.OR)
                    criteriaBuilder.add("loot_bastion_other", TRIGGER.lootTableUsed("chests/bastion_other"))
                    criteriaBuilder.add("loot_bastion_treasure", TRIGGER.lootTableUsed("chests/bastion_treasure"))
                    criteriaBuilder.add("loot_bastion_hoglin_stable", TRIGGER.lootTableUsed("chests/bastion_hoglin_stable"))
                    criteriaBuilder.add("loot_bastion_bridge", TRIGGER.lootTableUsed("chests/bastion_bridge"))
                })
        });

    nether
        .addChild("distract_piglin", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("gold_ingot")
                    displayBuilder.setTitle(Text.translate("advancements.nether.distract_piglin.title"))
                    displayBuilder.setDescription(Text.translate("advancements.nether.distract_piglin.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.setStrategy(RequirementsStrategy.OR)
                    const DISTRACT_PIGLIN_PLAYER_ARMOR_PREDICATE = [];
                    const armor = ["golden_helmet", "golden_chestplate", "golden_leggings", "golden_boots"];
                    armor.forEach(item => DISTRACT_PIGLIN_PLAYER_ARMOR_PREDICATE.push(
                        CONDITION.entityProperty(entityPredicateBuilder => {
                            entityPredicateBuilder.setEquipment(equipmentPredicateBuilder => {
                                equipmentPredicateBuilder.setHead(itemPredicateBuilder => itemPredicateBuilder.of(item))
                            })
                        }).invert()
                    ))
                    const PIGLIN = PREDICATE.entity(entityPredicateBuilder => {
                        entityPredicateBuilder.of("piglin")
                        entityPredicateBuilder.setFlags(entityflagsPredicateBuilder => {
                            entityflagsPredicateBuilder.isBaby(false)
                        })
                    });
                    criteriaBuilder.add("distract_piglin", TRIGGER.itemPickedUpByEntity(triggerBuilder => {
                        triggerBuilder.setPlayerByCondition(DISTRACT_PIGLIN_PLAYER_ARMOR_PREDICATE)
                        triggerBuilder.setItem("#minecraft:piglin_loved")
                        triggerBuilder.setEntityByPredicate(PIGLIN)
                    }))
                    criteriaBuilder.add("distract_piglin_directly", TRIGGER.playerInteract(triggerBuilder => {
                        triggerBuilder.setPlayerByCondition(DISTRACT_PIGLIN_PLAYER_ARMOR_PREDICATE)
                        triggerBuilder.setItem("gold_ingot")
                        triggerBuilder.setEntityByPredicate(PIGLIN)
                    }))
                })
        });
})*/
