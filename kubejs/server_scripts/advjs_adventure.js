AdvJSEvents.advancement(event => {
    const { CONDITION, PREDICATE, PROVIDER, TRIGGER } = event;

    const fundamentals = event
        .create("advjs:fundamentals")
        .display(displayBuilder => {
            displayBuilder.setIcon("fundamentals:diamond_compass")
            displayBuilder.setTitle(Text.translate("Core: The Fundamentals"))
            displayBuilder.setDescription(Text.translate("Thanks for downloading our modpack"))
            displayBuilder.setBackground("textures/gui/advancements/backgrounds/adventure.png")
            displayBuilder.setShowToast(false)
            displayBuilder.setAnnounceToChat(false)
        })
        .criteria(criteriaBuilder => {
            criteriaBuilder.setStrategy(RequirementsStrategy.OR)
            criteriaBuilder.add("crafting_table", TRIGGER.hasItems("crafting_table"))
            criteriaBuilder.add("grind_diamond", TRIGGER.hasItems("fundamentals:diamond_chunk"))
        });

    const grind_diamond = fundamentals
        .addChild("grind_diamond", advBuilder => {
            advBuilder
               .display(displayBuilder => {
                    displayBuilder.setIcon("fundamentals:diamond_chunk")
                    displayBuilder.setTitle(Text.translate("First step to riches"))
                    displayBuilder.setDescription(Text.translate("Split a diamond in a Millstone"))
                })
               .criteria(criteriaBuilder => {
                    criteriaBuilder.add("diamond_chunk", TRIGGER.hasItems("fundamentals:diamond_chunk"))
                })
               .rewards(rewardsBuilder => rewardsBuilder.setExperience(50))
        });
    
    grind_diamond
        .addChild("grind_chunk", advBuilder => {
            advBuilder
               .display(displayBuilder => {
                    displayBuilder.setIcon("fundamentals:diamond_shard")
                    displayBuilder.setTitle(Text.translate("Second step to riches"))
                    displayBuilder.setDescription(Text.translate("Split a diamond chunk in a Crusher"))
                })
               .criteria(criteriaBuilder => {
                    criteriaBuilder.add("diamond_shard", TRIGGER.hasItems("fundamentals:diamond_shard"))
                })
                .rewards(rewardsBuilder => {
                    rewardsBuilder.setExperience(100);
               });
        });

    /*const sleep_in_bed = fundamentals
        .addChild("sleep_in_bed", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("red_bed")
                    displayBuilder.setTitle(Text.translate("advancements.adventure.sleep_in_bed.title"))
                    displayBuilder.setDescription(Text.translate("advancements.adventure.sleep_in_bed.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("slept_in_bed", TRIGGER.sleptInBed(triggerBuilder => { }))
                })
        });

    sleep_in_bed
        .addChild("adventuring_time", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("diamond_boots")
                    displayBuilder.setTitle(Text.translate("advancements.adventure.adventuring_time.title"))
                    displayBuilder.setDescription(Text.translate("advancements.adventure.adventuring_time.description"))
                    displayBuilder.setFrameType(FrameType.CHALLENGE)
                })
                .criteria(criteriaBuilder => {
                    PROVIDER.getOverworldBiomes().forEach(biomeKey => {
                        criteriaBuilder.add(biomeKey.toString(), TRIGGER.location(triggerBuilder => {
                            triggerBuilder.setLocation(locationPredicateBuilder => {
                                locationPredicateBuilder.setBiome(biomeKey)
                            })
                        }))
                    })
                })
                .rewards(rewardsBuilder => rewardsBuilder.setExperience(500))
        });

    const trade = fundamentals
        .addChild("trade", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("emerald")
                    displayBuilder.setTitle(Text.translate("advancements.adventure.trade.title"))
                    displayBuilder.setDescription(Text.translate("advancements.adventure.trade.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("traded", TRIGGER.villagerTrade(triggerBuilder => { }))
                })
        });

    trade
        .addChild("trade_at_world_height", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("emerald")
                    displayBuilder.setTitle(Text.translate("advancements.adventure.trade_at_world_height.title"))
                    displayBuilder.setDescription(Text.translate("advancements.adventure.trade_at_world_height.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("trade_at_world_height", TRIGGER.villagerTrade(triggerBuilder => {
                        triggerBuilder.setPlayer(playerPredicateBuilder => {
                            playerPredicateBuilder.setLocation(locationPredicateBuilder => {
                                locationPredicateBuilder.setY({ min: 319 })
                            })
                        })
                    }))
                })
        });

    const MOBS_TO_KILL = [
        "blaze", "cave_spider", "creeper", "drowned", "elder_guardian", "ender_dragon", "enderman", "endermite",
        "evoker", "ghast", "guardian", "hoglin", "husk", "magma_cube", "phantom", "piglin", "piglin_brute",
        "pillager", "ravager", "shulker", "silverfish", "skeleton", "slime", "spider", "stray", "vex",
        "vindicator", "witch", "wither_skeleton", "wither", "zoglin", "zombie_villager", "zombie", "zombified_piglin"
    ];

    const kill_a_mob = fundamentals
        .addChild("kill_a_mob", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("iron_sword")
                    displayBuilder.setTitle(Text.translate("advancements.adventure.kill_a_mob.title"))
                    displayBuilder.setDescription(Text.translate("advancements.adventure.kill_a_mob.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.setStrategy(RequirementsStrategy.OR)
                    MOBS_TO_KILL.forEach(mob => {
                        criteriaBuilder.add(mob, TRIGGER.playerKilledEntity(triggerBuilder => {
                            triggerBuilder.setKilledByType(mob)
                        }))
                    })
                })
        });

    kill_a_mob
        .addChild("kill_all_mobs", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("diamond_sword")
                    displayBuilder.setTitle(Text.translate("advancements.adventure.kill_all_mobs.title"))
                    displayBuilder.setDescription(Text.translate("advancements.adventure.kill_all_mobs.description"))
                    displayBuilder.setFrameType(FrameType.CHALLENGE)
                })
                .criteria(criteriaBuilder => {
                    MOBS_TO_KILL.forEach(mob => {
                        criteriaBuilder.add(mob, TRIGGER.playerKilledEntity(triggerBuilder => {
                            triggerBuilder.setKilledByType(mob)
                        }))
                    })
                })
                .rewards(rewardsBuilder => rewardsBuilder.setExperience(100))
        });

    const shoot_arrow = kill_a_mob
        .addChild("shoot_arrow", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("bow")
                    displayBuilder.setTitle(Text.translate("advancements.adventure.shoot_arrow.title"))
                    displayBuilder.setDescription(Text.translate("advancements.adventure.shoot_arrow.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("shot_arrow", TRIGGER.playerHurtEntity(triggerBuilder => {
                        triggerBuilder.setDamage(damagePredicateBuilder => {
                            damagePredicateBuilder.setType(damageSourcePredicateBuilder => {
                                damageSourcePredicateBuilder.setTag("is_projectile")
                                damageSourcePredicateBuilder.setDirectByType("arrows")
                            })
                        })
                    }))
                })
        });

    const throw_trident = kill_a_mob
        .addChild("throw_trident", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("trident")
                    displayBuilder.setTitle(Text.translate("advancements.adventure.throw_trident.title"))
                    displayBuilder.setDescription(Text.translate("advancements.adventure.throw_trident.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("shot_trident", TRIGGER.playerHurtEntity(triggerBuilder => {
                        triggerBuilder.setDamage(damagePredicateBuilder => {
                            damagePredicateBuilder.setType(damageSourcePredicateBuilder => {
                                damageSourcePredicateBuilder.setTag("is_projectile")
                                damageSourcePredicateBuilder.setDirectByType("trident")
                            })
                        })
                    }))
                })
        });

    throw_trident
        .addChild("very_very_frightening", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("trident")
                    displayBuilder.setTitle(Text.translate("advancements.adventure.very_very_frightening.title"))
                    displayBuilder.setDescription(Text.translate("advancements.adventure.very_very_frightening.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("struck_villager", TRIGGER.channeledLightning(triggerBuilder => {
                        triggerBuilder.addVictimByType("villager")
                    }))
                })
        });

    trade
        .addChild("summon_iron_golem", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("carved_pumpkin")
                    displayBuilder.setTitle(Text.translate("advancements.adventure.summon_iron_golem.title"))
                    displayBuilder.setDescription(Text.translate("advancements.adventure.summon_iron_golem.description"))
                    displayBuilder.setFrameType(FrameType.GOAL)
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("summoned_golem", TRIGGER.summonedEntity(triggerBuilder => {
                        triggerBuilder.setEntityByType("iron_golem")
                    }))
                })
        });

    shoot_arrow
        .addChild("sniper_duel", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("arrow")
                    displayBuilder.setTitle(Text.translate("advancements.adventure.sniper_duel.title"))
                    displayBuilder.setDescription(Text.translate("advancements.adventure.sniper_duel.description"))
                    displayBuilder.setFrameType(FrameType.CHALLENGE)
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("killed_skeleton", TRIGGER.playerKilledEntity(triggerBuilder => {
                        triggerBuilder.setKilled(entityPredicateBuilder => {
                            entityPredicateBuilder.of("skeleton")
                            entityPredicateBuilder.setDistance(distancePredicateBuilder => {
                                distancePredicateBuilder.setHorizontal({ min: 50 })
                            })
                        })
                        triggerBuilder.setKillingBlow(damageSourcePredicateBuilder => {
                            damageSourcePredicateBuilder.setTag("is_projectile")
                        })
                    }))
                })
                .rewards(rewardsBuilder => rewardsBuilder.setExperience(50))
        });

    kill_a_mob
        .addChild("totem_of_undying", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("totem_of_undying")
                    displayBuilder.setTitle(Text.translate("advancements.adventure.totem_of_undying.title"))
                    displayBuilder.setDescription(Text.translate("advancements.adventure.totem_of_undying.description"))
                    displayBuilder.setFrameType(FrameType.GOAL)
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("used_totem", TRIGGER.usedTotem(triggerBuilder => {
                        triggerBuilder.setItem("totem_of_undying")
                    }))
                })
        });

    const ol_betsy = fundamentals
        .addChild("ol_betsy", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("crossbow")
                    displayBuilder.setTitle(Text.translate("advancements.adventure.ol_betsy.title"))
                    displayBuilder.setDescription(Text.translate("advancements.adventure.ol_betsy.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("shot_crossbow", TRIGGER.shotCrossbow(triggerBuilder => {
                        triggerBuilder.setItem("crossbow")
                    }))
                })
        });

    ol_betsy
        .addChild("whos_the_pillager_now", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("crossbow")
                    displayBuilder.setTitle(Text.translate("advancements.adventure.whos_the_pillager_now.title"))
                    displayBuilder.setDescription(Text.translate("advancements.adventure.whos_the_pillager_now.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("kill_pillager", TRIGGER.killedByCrossbow(triggerBuilder => {
                        triggerBuilder.addVictimByType("pillager")
                    }))
                })
        });

    ol_betsy
        .addChild("two_birds_one_arrow", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("crossbow")
                    displayBuilder.setTitle(Text.translate("advancements.adventure.two_birds_one_arrow.title"))
                    displayBuilder.setDescription(Text.translate("advancements.adventure.two_birds_one_arrow.description"))
                    displayBuilder.setFrameType(FrameType.CHALLENGE)
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("two_birds", TRIGGER.killedByCrossbow(triggerBuilder => {
                        triggerBuilder.addVictimByType("phantom")
                        triggerBuilder.addVictimByType("phantom")
                    }))
                })
                .rewards(rewardsBuilder => rewardsBuilder.setExperience(65))
        });

    ol_betsy
        .addChild("arbalistic", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("crossbow")
                    displayBuilder.setTitle(Text.translate("advancements.adventure.arbalistic.title"))
                    displayBuilder.setDescription(Text.translate("advancements.adventure.arbalistic.description"))
                    displayBuilder.setFrameType(FrameType.CHALLENGE)
                    displayBuilder.setHidden(true)
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("arbalistic", TRIGGER.killedByCrossbow(triggerBuilder => {
                        triggerBuilder.setUniqueEntityTypes(5)
                    }))
                })
                .rewards(rewardsBuilder => rewardsBuilder.setExperience(85))
        });

    const leaderNbt = {
        BlockEntityTag: {
            Patterns: [
                { Color: 9, Pattern: "mr" }, { Color: 8, Pattern: "bs" },
                { Color: 7, Pattern: "cs" }, { Color: 8, Pattern: "bo" },
                { Color: 15, Pattern: "ms" }, { Color: 8, Pattern: "hh" },
                { Color: 8, Pattern: "mc" }, { Color: 15, Pattern: "bo" }
            ],
            id: "minecraft:banner"
        },
        HideFlags: 32,
        display: { Name: '{"color":"gold","translate":"block.minecraft.ominous_banner"}' }
    };
    const leaderBanner = Item.of('minecraft:white_banner', leaderNbt);

    const voluntary_exile = fundamentals
        .addChild("voluntary_exile", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon(leaderBanner)
                    displayBuilder.setTitle(Text.translate("advancements.adventure.voluntary_exile.title"))
                    displayBuilder.setDescription(Text.translate("advancements.adventure.voluntary_exile.description"))
                    displayBuilder.setHidden(true)
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("voluntary_exile", TRIGGER.playerKilledEntity(triggerBuilder =>
                        triggerBuilder.setKilled(entityPredicateBuilder => {
                            entityPredicateBuilder.setTag("raiders")
                            entityPredicateBuilder.setEquipment(equipmentPredicateBuilder => {
                                const leaderBannerPredicate = PREDICATE.item(predicateBuilder => {
                                    predicateBuilder.of("white_banner")
                                    predicateBuilder.setNbt(leaderNbt)
                                })
                                equipmentPredicateBuilder.setHeadByPredicate(leaderBannerPredicate)
                            })
                        })
                    ))
                })
        });

    voluntary_exile
        .addChild("hero_of_the_village", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon(leaderBanner)
                    displayBuilder.setTitle(Text.translate("advancements.adventure.hero_of_the_village.title"))
                    displayBuilder.setDescription(Text.translate("advancements.adventure.hero_of_the_village.description"))
                    displayBuilder.setFrameType(FrameType.CHALLENGE)
                    displayBuilder.setHidden(true)
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("hero_of_the_village", TRIGGER.raidWon(triggerBuilder => { }))
                })
                .rewards(rewardsBuilder => rewardsBuilder.setExperience(100))
        });

    fundamentals
        .addChild("honey_block_slide", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("honey_block")
                    displayBuilder.setTitle(Text.translate("advancements.adventure.honey_block_slide.title"))
                    displayBuilder.setDescription(Text.translate("advancements.adventure.honey_block_slide.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("honey_block_slide", TRIGGER.slideDownBlock(triggerBuilder => {
                        triggerBuilder.setBlock("honey_block")
                    }))
                })
        });

    shoot_arrow
        .addChild("bullseye", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("target")
                    displayBuilder.setTitle(Text.translate("advancements.adventure.bullseye.title"))
                    displayBuilder.setDescription(Text.translate("advancements.adventure.bullseye.description"))
                    displayBuilder.setFrameType(FrameType.CHALLENGE)
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("bullseye", TRIGGER.targetHit(triggerBuilder => {
                        triggerBuilder.setSignalStrength(15)
                        triggerBuilder.setProjectile(entityPredicateBuilder => {
                            entityPredicateBuilder.setDistance(distancePredicateBuilder => {
                                distancePredicateBuilder.setHorizontal({ min: 30 })
                            })
                        })
                    }))
                })
        });

    sleep_in_bed
        .addChild("walk_on_powder_snow_with_leather_boots", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("leather_boots")
                    displayBuilder.setTitle(Text.translate("advancements.adventure.walk_on_powder_snow_with_leather_boots.title"))
                    displayBuilder.setDescription(Text.translate("advancements.adventure.walk_on_powder_snow_with_leather_boots.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("walk_on_powder_snow_with_leather_boots", TRIGGER.location(triggerBuilder => {
                        triggerBuilder.setEquipment(equipmentPredicateBuilder => {
                            equipmentPredicateBuilder.setFeet(itemPredicateBuilder => {
                                itemPredicateBuilder.of("leather_boots")
                            })
                        })
                        triggerBuilder.setSteppingOn(locationPredicateBuilder => {
                            locationPredicateBuilder.setBlockByType("powder_snow")
                        })
                    }))
                })
        });

    fundamentals
        .addChild("lightning_rod_with_villager_no_fire", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("lightning_rod")
                    displayBuilder.setTitle(Text.translate("advancements.adventure.lightning_rod_with_villager_no_fire.title"))
                    displayBuilder.setDescription(Text.translate("advancements.adventure.lightning_rod_with_villager_no_fire.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("lightning_rod_with_villager_no_fire", TRIGGER.lightningStrike(triggerBuilder => {
                        triggerBuilder.setLightning(entityPredicateBuilder => {
                            entityPredicateBuilder.setTypeSpecific(entityPredicateBuilder.SPECIFIC.lightningBolt(lightningBoltPredicateBuilder => {
                                lightningBoltPredicateBuilder.blocksSetOnFire(0)
                                lightningBoltPredicateBuilder.setEntityStruckByType("villager")
                            }))
                            entityPredicateBuilder.setDistance(distancePredicateBuilder => {
                                distancePredicateBuilder.setAbsolute({ max: 30 })
                            })
                        })
                    }))
                })
        });

    function lookAtThroughSpyglass(entityType) {
        return TRIGGER.usingItem(triggerBuilder => {
            triggerBuilder.setPlayer(playerPredicateBuilder => {
                playerPredicateBuilder.setLookingAt(entityPredicateBuilder => {
                    entityPredicateBuilder.of(entityType)
                })
            })
            triggerBuilder.setItem("spyglass")
        })
    }

    const spyglass_at_parrot = fundamentals
        .addChild("spyglass_at_parrot", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("spyglass")
                    displayBuilder.setTitle(Text.translate("advancements.adventure.spyglass_at_parrot.title"))
                    displayBuilder.setDescription(Text.translate("advancements.adventure.spyglass_at_parrot.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("spyglass_at_parrot", lookAtThroughSpyglass("parrot"))
                })
        });

    const spyglass_at_ghast = spyglass_at_parrot
        .addChild("spyglass_at_ghast", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("spyglass")
                    displayBuilder.setTitle(Text.translate("advancements.adventure.spyglass_at_ghast.title"))
                    displayBuilder.setDescription(Text.translate("advancements.adventure.spyglass_at_ghast.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("spyglass_at_ghast", lookAtThroughSpyglass("ghast"))
                })
        });

    sleep_in_bed
        .addChild("play_jukebox_in_meadows", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("jukebox")
                    displayBuilder.setTitle(Text.translate("advancements.adventure.play_jukebox_in_meadows.title"))
                    displayBuilder.setDescription(Text.translate("advancements.adventure.play_jukebox_in_meadows.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("play_jukebox_in_meadows", TRIGGER.itemUsedOnBlock(triggerBuilder => {
                        const jukebox = CONDITION
                            .locationCheck()
                            .location(locationPredicateBuilder => {
                                locationPredicateBuilder.setBiome("meadow")
                                locationPredicateBuilder.setBlockByType("jukebox")
                            });
                        const tool = CONDITION.matchTool(itemPredicateBuilder => {
                            itemPredicateBuilder.setTag("music_discs")
                        });
                        triggerBuilder.addCondition(jukebox)
                        triggerBuilder.addCondition(tool)
                    }))
                })
        });

    spyglass_at_ghast
        .addChild("spyglass_at_dragon", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("spyglass")
                    displayBuilder.setTitle(Text.translate("advancements.adventure.spyglass_at_dragon.title"))
                    displayBuilder.setDescription(Text.translate("advancements.adventure.spyglass_at_dragon.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("spyglass_at_ghast", lookAtThroughSpyglass("ender_dragon"))
                })
        });

        fundamentals
        .addChild("fall_from_world_height", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("water_bucket")
                    displayBuilder.setTitle(Text.translate("advancements.adventure.fall_from_world_height.title"))
                    displayBuilder.setDescription(Text.translate("advancements.adventure.fall_from_world_height.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("fall_from_world_height", TRIGGER.fallFromHeight(triggerBuilder => {
                        triggerBuilder.setPlayer(playerPredicateBuilder => {
                            playerPredicateBuilder.setLocation(locationPredicateBuilder => {
                                locationPredicateBuilder.setY({ max: -59 })
                            })
                        })
                        triggerBuilder.setDistance(distancePredicateBuilder => {
                            distancePredicateBuilder.setY({ min: 379 })
                        })
                        triggerBuilder.setStartPosition(locationPredicateBuilder => {
                            locationPredicateBuilder.setY({ min: 319 })
                        })
                    }))
                })
        });

    kill_a_mob
        .addChild("kill_mob_near_sculk_catalyst", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("sculk_catalyst")
                    displayBuilder.setTitle(Text.translate("advancements.adventure.kill_mob_near_sculk_catalyst.title"))
                    displayBuilder.setDescription(Text.translate("advancements.adventure.kill_mob_near_sculk_catalyst.description"))
                    displayBuilder.setFrameType(FrameType.CHALLENGE)
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("kill_mob_near_sculk_catalyst", TRIGGER.playerKilledEntityNearSculkCatalyst(triggerBuilder => { }))
                })
        });

        fundamentals
        .addChild("avoid_vibration", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("sculk_sensor")
                    displayBuilder.setTitle(Text.translate("advancements.adventure.avoid_vibration.title"))
                    displayBuilder.setDescription(Text.translate("advancements.adventure.avoid_vibration.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("avoid_vibration", TRIGGER.avoidVibration(triggerBuilder => { }))
                })
        });

    const salvage_sherd = fundamentals
        .addChild("salvage_sherd", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("brush")
                    displayBuilder.setTitle(Text.translate("advancements.adventure.salvage_sherd.title"))
                    displayBuilder.setDescription(Text.translate("advancements.adventure.salvage_sherd.description"))
                })
                .criteria(criteriaBuilder => {
                    const sherds = [
                        "desert_pyramid", "desert_well", "ocean_ruin_cold",
                        "ocean_ruin_warm", "trail_ruins_rare", "trail_ruins_common"
                    ];
                    sherds.forEach(sherd => criteriaBuilder.add(sherd, TRIGGER.lootTableUsed("archaeology/" + sherd)))
                    let item = PREDICATE.item(itemPredicateBuilder => {
                        itemPredicateBuilder.setTag("decorated_pot_sherds")
                    });
                    criteriaBuilder.add("has_sherd", TRIGGER.hasItems(item))
                    criteriaBuilder.setRequirements([sherds, ["has_sherd"]])
                })
        });

    salvage_sherd
        .addChild("craft_decorated_pot_using_only_sherds", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon(Item.of("minecraft:decorated_pot", {
                        BlockEntityTag: {
                            id: "minecraft:decorated_pot",
                            sherds: [
                                "minecraft:brick",
                                "minecraft:heart_pottery_sherd",
                                "minecraft:brick",
                                "minecraft:explorer_pottery_sherd"
                            ]
                        }
                    }))
                    displayBuilder.setTitle(Text.translate("advancements.adventure.craft_decorated_pot_using_only_sherds.title"))
                    displayBuilder.setDescription(Text.translate("advancements.adventure.craft_decorated_pot_using_only_sherds.description"))
                })
                .criteria(criteriaBuilder => {
                    const item = PREDICATE.item(itemPredicateBuilder => itemPredicateBuilder.setTag("decorated_pot_sherds"))
                    criteriaBuilder.add("pot_crafted_using_only_sherds", TRIGGER.craftedItem("decorated_pot", [item, item, item, item]))
                })
        })

    const trim_with_any_armor_pattern = fundamentals
        .addChild("trim_with_any_armor_pattern", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("dune_armor_trim_smithing_template")
                    displayBuilder.setTitle(Text.translate("advancements.adventure.craft_decorated_pot_using_only_sherds.title"))
                    displayBuilder.setDescription(Text.translate("advancements.adventure.craft_decorated_pot_using_only_sherds.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.setStrategy(RequirementsStrategy.OR)
                    PROVIDER.getSmithingTrims().forEach(trim => {
                        criteriaBuilder.add("armor_trimmed_" + trim, TRIGGER.craftedItem(trim))
                    })
                })
        });

    trim_with_any_armor_pattern
        .addChild("trim_with_all_exclusive_armor_patterns", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("silence_armor_trim_smithing_template")
                    displayBuilder.setTitle(Text.translate("advancements.adventure.trim_with_all_exclusive_armor_patterns.title"))
                    displayBuilder.setDescription(Text.translate("advancements.adventure.trim_with_all_exclusive_armor_patterns.description"))
                    displayBuilder.setFrameType(FrameType.CHALLENGE)
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.setStrategy(RequirementsStrategy.AND)
                    const patterns = [
                        "spire", "snout", "rib", "ward",
                        "silence", "vex", "tide", "wayfinder"
                    ];
                    patterns.forEach(pattern => {
                        let id = "minecraft:" + pattern + "_armor_trim_smithing_template_smithing_trim";
                        criteriaBuilder.add("armor_trimmed_" + id, TRIGGER.craftedItem(id))
                    })
                })
        });

    fundamentals
        .addChild("read_power_from_chiseled_bookshelf", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("chiseled_bookshelf")
                    displayBuilder.setTitle(Text.translate("advancements.adventure.read_power_from_chiseled_bookshelf.title"))
                    displayBuilder.setDescription(Text.translate("advancements.adventure.read_power_from_chiseled_bookshelf.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.setStrategy(RequirementsStrategy.OR)
                    const horizontal = [
                        { vec: [1, 0], id: "east" },
                        { vec: [0, -1], id: "south" },
                        { vec: [-1, 0], id: "west" },
                        { vec: [0, 1], id: "north" }
                    ];
                    criteriaBuilder.add("chiseled_bookshelf", TRIGGER.placedBlock(triggerBuilder => {
                        let conditions = [];
                        horizontal.forEach(facing => {
                            let check = CONDITION
                                .locationCheck()
                                .location(locationPredicateBuilder => {
                                    let state = PREDICATE.stateProperties(predicateBuilder => {
                                        predicateBuilder.match("facing", facing.id)
                                    });
                                    locationPredicateBuilder.setBlock(blockPredicateBuilder => {
                                        blockPredicateBuilder.ofBlocks("comparator")
                                        blockPredicateBuilder.setPropertiesByPredicate(state)
                                    })
                                })
                                .offset([-facing.vec[0], 0, -facing.vec[1]]);
                            conditions.push(check)
                        })
                        triggerBuilder.addCondition(CONDITION.blockStateProperty("chiseled_bookshelf"))
                        triggerBuilder.addCondition(CONDITION.anyOf(conditions))
                    }))
                    criteriaBuilder.add("chiseled_bookshelf", TRIGGER.placedBlock(triggerBuilder => {
                        let conditions = [];
                        horizontal.forEach(facing => {
                            let state = CONDITION
                                .blockStateProperty("comparator")
                                .stateProperties(statePropertiesPredicateBuilder => {
                                    statePropertiesPredicateBuilder.match("facing", facing.id)
                                });
                            let location = CONDITION
                                .locationCheck()
                                .location(locationPredicateBuilder => {
                                    locationPredicateBuilder.setBlockByType("chiseled_bookshelf")
                                })
                                .offset([facing.vec[0], 0, facing.vec[1]]);
                            conditions.push(CONDITION.allOf(state, location))
                        })
                        triggerBuilder.addCondition(CONDITION.anyOf(conditions))
                    }))
                })
        });*/
})

AdvJSEvents.betterAdv(event => {
    event.modify("advjs:fundamentals/grind_diamond").posX(32).posY(0)
})