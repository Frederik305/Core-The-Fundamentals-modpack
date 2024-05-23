/*AdvJSEvents.advancement(event => {
    const { TRIGGER } = event;

    const end = event
        .create("advjs:end")
        .display(displayBuilder => {
            displayBuilder.setIcon("end_stone")
            displayBuilder.setTitle(Text.translate("advancements.end.root.title"))
            displayBuilder.setDescription(Text.translate("advancements.end.root.description"))
            displayBuilder.setBackground("textures/gui/advancements/backgrounds/end.png")
            displayBuilder.setShowToast(false)
            displayBuilder.setAnnounceToChat(false)
        })
        .criteria(criteriaBuilder => {
            criteriaBuilder.add("entered_end", TRIGGER.changedDimension(triggerBuilder => {
                triggerBuilder.setTo("the_end")
            }))
        });

    const kill_dragon = end
        .addChild("kill_dragon", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("dragon_head")
                    displayBuilder.setTitle(Text.translate("advancements.end.kill_dragon.title"))
                    displayBuilder.setDescription(Text.translate("advancements.end.kill_dragon.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("killed_dragon", TRIGGER.playerKilledEntity(triggerBuilder => {
                        triggerBuilder.setKilledByType("ender_dragon")
                    }))
                })
        });

    const enter_end_gateway = kill_dragon
        .addChild("enter_end_gateway", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("ender_pearl")
                    displayBuilder.setTitle(Text.translate("advancements.end.enter_end_gateway.title"))
                    displayBuilder.setDescription(Text.translate("advancements.end.enter_end_gateway.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("entered_end_gateway", TRIGGER.entersBlock(triggerBuilder => {
                        triggerBuilder.setBlock("end_gateway")
                    }))
                })
        });

    kill_dragon
        .addChild("respawn_dragon", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("end_crystal")
                    displayBuilder.setTitle(Text.translate("advancements.end.respawn_dragon.title"))
                    displayBuilder.setDescription(Text.translate("advancements.end.respawn_dragon.description"))
                    displayBuilder.setFrameType(FrameType.GOAL)
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("summoned_dragon", TRIGGER.summonedEntity(triggerBuilder => {
                        triggerBuilder.setEntityByType("ender_dragon")
                    }))
                })
        });

    const find_end_city = enter_end_gateway
        .addChild("find_end_city", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("purpur_block")
                    displayBuilder.setTitle(Text.translate("advancements.end.find_end_city.title"))
                    displayBuilder.setDescription(Text.translate("advancements.end.find_end_city.description"))
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("in_city", TRIGGER.location(triggerBuilder => {
                        triggerBuilder.setLocation(locationPredicateBuilder => {
                            locationPredicateBuilder.setStructure("end_city")
                        })
                    }))
                })
        });

    kill_dragon
        .addChild("dragon_breath", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("dragon_breath")
                    displayBuilder.setTitle(Text.translate("advancements.end.dragon_breath.title"))
                    displayBuilder.setDescription(Text.translate("advancements.end.dragon_breath.description"))
                    displayBuilder.setFrameType(FrameType.GOAL)
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("dragon_breath", TRIGGER.hasItems("dragon_breath"))
                })
        });

    find_end_city
        .addChild("levitate", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("shulker_shell")
                    displayBuilder.setTitle(Text.translate("advancements.end.levitate.title"))
                    displayBuilder.setDescription(Text.translate("advancements.end.levitate.description"))
                    displayBuilder.setFrameType(FrameType.CHALLENGE)
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("levitated", TRIGGER.levitated(triggerBuilder => {
                        triggerBuilder.setDistance(distancePredicateBuilder => {
                            distancePredicateBuilder.setY({ min: 50 })
                        })
                    }))
                })
                .rewards(rewardsBuilder => rewardsBuilder.setExperience(50))
        });

    find_end_city
        .addChild("elytra", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("elytra")
                    displayBuilder.setTitle(Text.translate("advancements.end.elytra.title"))
                    displayBuilder.setDescription(Text.translate("advancements.end.elytra.description"))
                    displayBuilder.setFrameType(FrameType.GOAL)
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("elytra", TRIGGER.hasItems("elytra"))
                })
        });

    kill_dragon
        .addChild("dragon_egg", advBuilder => {
            advBuilder
                .display(displayBuilder => {
                    displayBuilder.setIcon("dragon_egg")
                    displayBuilder.setTitle(Text.translate("advancements.end.dragon_egg.title"))
                    displayBuilder.setDescription(Text.translate("advancements.end.dragon_egg.description"))
                    displayBuilder.setFrameType(FrameType.GOAL)
                })
                .criteria(criteriaBuilder => {
                    criteriaBuilder.add("dragon_egg", TRIGGER.hasItems("dragon_egg"))
                })
        });
})*/
