import { dark, light, fire, earth, wind, water, spell, trap, divine, star1, star2, star3, star4, star5, star6, star7, star8, star9, star10, star12, equipSpell, fieldSpell, ritualSpell, counterSpell, continuousSpell, quickSpell, C_rarity, R_rarity, SR_rarity, UR_rarity} from '../assets/index.js'

export const attributeImages = {
    WATER: water,
    FIRE: fire,
    WIND: wind,
    DARK: dark,
    LIGHT: light,
    EARTH: earth,
    SPELL: spell,
    TRAP: trap,
    DIVINE: divine,
}

export const spellTrapTypeImages = {
    "Field Spell": fieldSpell,
    "Continuous Spell": continuousSpell,
    "Quick-Play Spell": quickSpell,
    "Equip Spell": equipSpell,
    "Counter Spell": counterSpell,
    "Ritual Spell": ritualSpell,
    "Counter Trap": counterSpell,
    "Continuous Trap": continuousSpell  
}

export const levelImages = {
    1: star1,
    2: star2,
    3: star3,
    4: star4,
    5: star5,
    6: star6,
    7: star7,
    8: star8,
    9: star9,
    10: star10,
    12: star12,
}

export const rarityImages = {
    Common: C_rarity,
    Rare: R_rarity,
    "Super Rare": SR_rarity,
    "Ultra Rare": UR_rarity,

}

export const BackCardRarityImages = {
    Common: C_rarity,
    Rare: R_rarity,
    "Super Rare": SR_rarity,
    "Ultra Rare": UR_rarity,

}