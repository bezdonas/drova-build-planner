import type { SkillCategory } from '../types'

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'sword',
    name: 'Sword',
    skills: [
      {
        id: 'sword-basic',
        name: 'Basic Swordfighting',
        category: 'sword',
        cost: 3,
        prowess: 25,
        prerequisites: [],
        description:
          "Improves your fighting stance, increases damage you inflict by <b>10%</b>. You'll learn the ability <b>Execute</b>.",
        ability: {
          name: 'Execute',
          description:
            "You inflict <b>150%</b> weapon damage and an additional <b>100%</b> weapon damage per active bleed that's ailing the opponent.",
        },
        bonuses: [
          { type: 'sword_damage', label: 'Sword damage', value: 10, unit: '%' },
        ],
      },
      {
        id: 'sword-trained',
        name: 'Trained Swordfighting',
        category: 'sword',
        cost: 4,
        prowess: 45,
        prerequisites: ['sword-basic'],
        description:
          'Increases the damage you inflict by <b>25%</b> and unlocks a <b>third combo attack</b>.',
        bonuses: [
          { type: 'sword_damage', label: 'Sword damage', value: 25, unit: '%' },
        ],
      },
      {
        id: 'sword-masterful',
        name: 'Masterful Swordfighting',
        category: 'sword',
        cost: 8,
        prowess: 70,
        prerequisites: ['sword-trained'],
        description:
          'Improves your fighting stance and increases the damage you inflict by <b>40%</b>.',
        bonuses: [
          { type: 'sword_damage', label: 'Sword damage', value: 40, unit: '%' },
        ],
      },
      {
        id: 'sword-hard-blow',
        name: 'Hard Blow',
        category: 'sword',
        cost: 3,
        prerequisites: ['sword-basic'],
        description:
          'Heavy sword attacks consume <b>50%</b> less stamina.',
        bonuses: [
          {
            type: 'sword_heavy_stamina',
            label: 'Sword heavy attack stamina reduction',
            value: 50,
            unit: '%',
          },
        ],
      },
      {
        id: 'sword-precision',
        name: 'Precision',
        category: 'sword',
        cost: 3,
        prerequisites: ['sword-basic', 'sword-trained'],
        description:
          'When attacking with your sword you have a <b>5%</b> higher chance to land a critical hit.',
        bonuses: [
          { type: 'sword_crit', label: 'Sword crit chance', value: 5, unit: '%' },
        ],
      },
      {
        id: 'sword-opportunist',
        name: 'Opportunist',
        category: 'sword',
        cost: 4,
        prerequisites: ['sword-trained', 'sword-masterful'],
        description:
          "After landing a critical hit with your sword, you'll regain <b>60%</b> of the focus cost of the next ability requiring focus.",
        bonuses: [
          {
            type: 'sword_focus_regain',
            label: 'Focus cost regain on sword crit',
            value: 60,
            unit: '%',
          },
        ],
      },
    ],
  },
  {
    id: 'spear',
    name: 'Spear',
    skills: [
      {
        id: 'spear-basic',
        name: 'Basic Spearfighting',
        category: 'spear',
        cost: 3,
        prowess: 25,
        prerequisites: [],
        description:
          "Improves your fighting stance, increases the damage you inflict by <b>10%</b>. You'll learn the weapon ability <b>Pierce</b>.",
        ability: {
          name: 'Pierce',
          description:
            'You leap ahead, and using your spear, execute multiple rapid thrusts that inflict <b>200%</b> weapon damage per hit to opponents in front of you.',
        },
        bonuses: [
          { type: 'spear_damage', label: 'Spear damage', value: 10, unit: '%' },
        ],
      },
      {
        id: 'spear-trained',
        name: 'Trained Spearfighting',
        category: 'spear',
        cost: 4,
        prowess: 45,
        prerequisites: ['spear-basic'],
        description:
          'Increases the damage you inflict by <b>30%</b>. Normal spear attacks regenerate <b>8</b> stamina.',
        bonuses: [
          { type: 'spear_damage', label: 'Spear damage', value: 30, unit: '%' },
          { type: 'spear_stamina_regen', label: 'Stamina regen per hit', value: 8, unit: '' },
        ],
      },
      {
        id: 'spear-masterful',
        name: 'Masterful Spearfighting',
        category: 'spear',
        cost: 8,
        prowess: 70,
        prerequisites: ['spear-trained'],
        description:
          'Improves your fighting stance. Increases the damage you inflict by <b>50%</b>, and the stamina you regenerate with each hit to <b>12</b>.',
        bonuses: [
          { type: 'spear_damage', label: 'Spear damage', value: 50, unit: '%' },
          { type: 'spear_stamina_regen', label: 'Stamina regen per hit', value: 12, unit: '' },
        ],
      },
      {
        id: 'spear-poisoned-tip',
        name: 'Poisoned Tip',
        category: 'spear',
        cost: 3,
        prerequisites: ['spear-basic'],
        description:
          'Landing critical hits with your spear afflict your opponent with <b>Poison</b>.',
        bonuses: [],
      },
      {
        id: 'spear-peak-performance',
        name: 'Peak Performance',
        category: 'spear',
        cost: 3,
        prerequisites: ['spear-basic', 'spear-trained'],
        description:
          'The tip of the spear inflicts up to <b>25%</b> additional damage.',
        bonuses: [
          { type: 'spear_tip_damage', label: 'Spear tip additional damage', value: 25, unit: '%' },
        ],
      },
      {
        id: 'spear-focused-blow',
        name: 'Focused Blow',
        category: 'spear',
        cost: 4,
        prerequisites: ['spear-trained', 'spear-masterful'],
        description:
          'Each spear attack on the same opponent increases the generated focus by <b>1</b>.',
        bonuses: [
          { type: 'spear_focus_gen', label: 'Focus generated per hit', value: 1, unit: '' },
        ],
      },
    ],
  },
  {
    id: 'axe',
    name: 'Axe',
    skills: [
      {
        id: 'axe-basic',
        name: 'Basic Axefighting',
        category: 'axe',
        cost: 3,
        prowess: 25,
        prerequisites: [],
        description:
          "Improves your fighting stance, increases the damage you inflict by <b>10%</b>. You'll learn the weapon ability <b>Blood Frenzy</b>.",
        ability: {
          name: 'Blood Frenzy',
          description:
            'A heavy attack that inflicts <b>300%</b> damage. If you kill an opponent while Blood Frenzy is active, you\'ll regain the focus points for the skill.',
        },
        bonuses: [
          { type: 'axe_damage', label: 'Axe damage', value: 10, unit: '%' },
        ],
      },
      {
        id: 'axe-trained',
        name: 'Trained Axefighting',
        category: 'axe',
        cost: 4,
        prowess: 45,
        prerequisites: ['axe-basic'],
        description:
          'Increases the damage you inflict by <b>25%</b> and unlocks a <b>third combo attack</b>.',
        bonuses: [
          { type: 'axe_damage', label: 'Axe damage', value: 25, unit: '%' },
        ],
      },
      {
        id: 'axe-masterful',
        name: 'Masterful Axefighting',
        category: 'axe',
        cost: 8,
        prowess: 70,
        prerequisites: ['axe-trained'],
        description:
          'Improves your fighting stance and increases the damage you inflict by <b>50%</b>.',
        bonuses: [
          { type: 'axe_damage', label: 'Axe damage', value: 50, unit: '%' },
        ],
      },
      {
        id: 'axe-full-throttle',
        name: 'Full Throttle',
        category: 'axe',
        cost: 3,
        prerequisites: ['axe-basic'],
        description:
          'Heavy attacks consume <b>50%</b> less stamina.',
        bonuses: [
          { type: 'axe_heavy_stamina', label: 'Axe heavy attack stamina reduction', value: 50, unit: '%' },
        ],
      },
      {
        id: 'axe-coup-de-grace',
        name: 'Coup de Grace',
        category: 'axe',
        cost: 3,
        prerequisites: ['axe-basic', 'axe-trained'],
        description:
          'Your first axe attack on an opponent whose stance has been broken will result in a <b>critical hit</b>.',
        bonuses: [],
      },
      {
        id: 'axe-battle-frenzy',
        name: 'Battle Frenzy',
        category: 'axe',
        cost: 4,
        prerequisites: ['axe-trained', 'axe-masterful'],
        description:
          'Upon a successful hit, attacks generate an additional <b>2</b> focus.',
        bonuses: [
          { type: 'axe_focus_gen', label: 'Additional focus per hit', value: 2, unit: '' },
        ],
      },
    ],
  },
  {
    id: 'dagger',
    name: 'Dagger',
    skills: [
      {
        id: 'dagger-basic',
        name: 'Basic Daggerfighting',
        category: 'dagger',
        cost: 3,
        prowess: 25,
        prerequisites: [],
        description:
          "Improves your fighting stance, increases the damage you inflict by <b>10%</b>. You'll learn the weapon ability <b>Contagion</b>.",
        ability: {
          name: 'Contagion',
          description:
            'You inflict <b>100%</b> weapon damage, and poison opponents suffering from an active bleed.',
        },
        bonuses: [
          { type: 'dagger_damage', label: 'Dagger damage', value: 10, unit: '%' },
        ],
      },
      {
        id: 'dagger-trained',
        name: 'Trained Daggerfighting',
        category: 'dagger',
        cost: 4,
        prowess: 45,
        prerequisites: ['dagger-basic'],
        description:
          'Increases the damage you inflict by <b>20%</b>, increases the focus you generate with each hit by <b>1</b>.',
        bonuses: [
          { type: 'dagger_damage', label: 'Dagger damage', value: 20, unit: '%' },
          { type: 'dagger_focus_gen', label: 'Focus generated per hit', value: 1, unit: '' },
        ],
      },
      {
        id: 'dagger-masterful',
        name: 'Masterful Daggerfighting',
        category: 'dagger',
        cost: 8,
        prowess: 70,
        prerequisites: ['dagger-trained'],
        description:
          'Improves your fighting stance, increases the damage you inflict by <b>30%</b>, increases the focus you generate with each hit by <b>2</b>.',
        bonuses: [
          { type: 'dagger_damage', label: 'Dagger damage', value: 30, unit: '%' },
          { type: 'dagger_focus_gen', label: 'Focus generated per hit', value: 2, unit: '' },
        ],
      },
      {
        id: 'dagger-efficient-strike',
        name: 'Efficient Strike',
        category: 'dagger',
        cost: 3,
        prerequisites: ['dagger-basic'],
        description:
          'Normal attacks generate <b>6</b> stamina.',
        bonuses: [
          { type: 'dagger_stamina_gen', label: 'Stamina generated per normal attack', value: 6, unit: '' },
        ],
      },
      {
        id: 'dagger-surprise',
        name: 'Surprise!',
        category: 'dagger',
        cost: 3,
        prerequisites: ['dagger-basic', 'dagger-trained'],
        description:
          'Your first attack with a dagger after dodging will result in a <b>40%</b> higher chance to land a critical hit.',
        bonuses: [
          { type: 'dagger_dodge_crit', label: 'Crit chance after dodge', value: 40, unit: '%' },
        ],
      },
      {
        id: 'dagger-fully-focused',
        name: 'Fully Focused!',
        category: 'dagger',
        cost: 4,
        prerequisites: ['dagger-trained', 'dagger-masterful'],
        description:
          "After using an ability, you'll gain <b>10</b> focus.",
        bonuses: [
          { type: 'dagger_focus_on_ability', label: 'Focus gained after ability use', value: 10, unit: '' },
        ],
      },
    ],
  },
  {
    id: 'shield',
    name: 'Shield',
    skills: [
      {
        id: 'shield-basic',
        name: 'Basic Shieldfighting',
        category: 'shield',
        cost: 3,
        prowess: 30,
        prerequisites: [],
        description:
          'You can now perform a <b>Perfect Block</b> with your shield.',
        ability: {
          name: 'Perfect Block',
          description:
            'You perform a Perfect Block that consumes very little stamina if you block right before an attack lands.',
        },
        bonuses: [],
      },
      {
        id: 'shield-trained',
        name: 'Trained Shieldfighting',
        category: 'shield',
        cost: 4,
        prowess: 55,
        prerequisites: ['shield-basic'],
        description:
          'A Perfect Block temporarily <b>stuns</b> your opponents.',
        bonuses: [],
      },
      {
        id: 'shield-that-all-you-got',
        name: 'That all you got?',
        category: 'shield',
        cost: 3,
        prerequisites: ['shield-basic', 'shield-trained'],
        description:
          'If you block an attack perfectly, you generate <b>10</b> focus.',
        bonuses: [
          { type: 'shield_focus_on_block', label: 'Focus on perfect block', value: 10, unit: '' },
        ],
      },
      {
        id: 'shield-out-of-balance',
        name: 'Out of Balance',
        category: 'shield',
        cost: 3,
        prerequisites: ['shield-basic'],
        description:
          'If you block an attack perfectly, your next attack will result in a <b>critical hit</b>.',
        bonuses: [],
      },
    ],
  },
  {
    id: 'slingshot',
    name: 'Slingshot',
    skills: [
      {
        id: 'slingshot-basic',
        name: 'Basic Slingshotfighting',
        category: 'slingshot',
        cost: 3,
        prowess: 30,
        prerequisites: [],
        description:
          "Increases the damage you inflict by <b>50%</b> and stance damage by <b>25%</b>. You'll learn the weapon ability <b>Ricochet</b>.",
        ability: {
          name: 'Ricochet',
          description:
            'You fire a projectile that inflicts <b>150%</b> weapon damage before it ricochets off its target and hits additional opponents nearby.',
        },
        bonuses: [
          { type: 'slingshot_damage', label: 'Slingshot damage', value: 50, unit: '%' },
          { type: 'slingshot_stance_damage', label: 'Slingshot stance damage', value: 25, unit: '%' },
        ],
      },
      {
        id: 'slingshot-masterful',
        name: 'Masterful Slingshotfighting',
        category: 'slingshot',
        cost: 4,
        prowess: 55,
        prerequisites: ['slingshot-basic'],
        description:
          'Increases the damage you inflict by <b>100%</b> and stance damage by <b>50%</b>.',
        bonuses: [
          { type: 'slingshot_damage', label: 'Slingshot damage', value: 100, unit: '%' },
          { type: 'slingshot_stance_damage', label: 'Slingshot stance damage', value: 50, unit: '%' },
        ],
      },
      {
        id: 'slingshot-whiplash',
        name: 'Whiplash',
        category: 'slingshot',
        cost: 3,
        prerequisites: ['slingshot-basic'],
        description:
          'If you break the stance of an opponent using your slingshot, your next attack against them will inflict an additional <b>25%</b> damage.',
        bonuses: [
          { type: 'slingshot_stance_break_bonus', label: 'Bonus damage after stance break', value: 25, unit: '%' },
        ],
      },
      {
        id: 'slingshot-double-charge',
        name: 'Double Charge',
        category: 'slingshot',
        cost: 3,
        prerequisites: ['slingshot-basic', 'slingshot-masterful'],
        description:
          'There is a <b>25%</b> chance that, when a projectile is fired, a second one will be launched without using up ammunition.',
        bonuses: [
          { type: 'slingshot_double_shot', label: 'Double shot chance', value: 25, unit: '%' },
        ],
      },
    ],
  },
  {
    id: 'bow',
    name: 'Bow',
    skills: [
      {
        id: 'bow-basic',
        name: 'Basic Bowfighting',
        category: 'bow',
        cost: 3,
        prowess: 30,
        prerequisites: [],
        description:
          "Increases the damage you inflict by <b>50%</b>. You can now perform a <b>Mighty Shot</b> with your bow.",
        ability: {
          name: 'Mighty Shot',
          description:
            'While aiming with your bow, you unleash a Mighty Shot at exactly the right moment that inflicts <b>150%</b> weapon damage.',
        },
        bonuses: [
          { type: 'bow_damage', label: 'Bow damage', value: 50, unit: '%' },
        ],
      },
      {
        id: 'bow-masterful',
        name: 'Masterful Bowfighting',
        category: 'bow',
        cost: 4,
        prowess: 55,
        prerequisites: ['bow-basic'],
        description:
          "Increases the damage you inflict by <b>100%</b> and reduces the time you need to aim. You'll learn the weapon ability <b>Concussive Shot</b>.",
        ability: {
          name: 'Concussive Shot',
          description:
            'You fire an arrow that inflicts <b>250%</b> weapon damage and stuns opponents for <b>2</b> seconds.',
        },
        bonuses: [
          { type: 'bow_damage', label: 'Bow damage', value: 100, unit: '%' },
        ],
      },
      {
        id: 'bow-quick-draw',
        name: 'Quick Draw',
        category: 'bow',
        cost: 3,
        prerequisites: ['bow-basic'],
        description:
          'After you dodge, you can fire an arrow without aiming.',
        bonuses: [],
      },
      {
        id: 'bow-bulls-eye',
        name: "Bull's Eye",
        category: 'bow',
        cost: 3,
        prerequisites: ['bow-basic', 'bow-masterful'],
        description:
          'Critical hits with the bow inflict <b>50%</b> more damage.',
        bonuses: [
          { type: 'bow_crit_damage', label: 'Bow crit damage bonus', value: 50, unit: '%' },
        ],
      },
    ],
  },
  {
    id: 'crafting',
    name: 'Crafting',
    skills: [
      {
        id: 'crafting-craft',
        name: 'Craft',
        category: 'crafting',
        cost: 2,
        prerequisites: [],
        description:
          'You can craft a variety of items.',
        bonuses: [],
      },
      {
        id: 'crafting-masterful',
        name: 'Masterful Craftsmanship',
        category: 'crafting',
        cost: 3,
        prerequisites: ['crafting-craft'],
        description:
          'You can craft dangerous traps, items, and ammunition.',
        bonuses: [],
      },
    ],
  },
  {
    id: 'preparation',
    name: 'Preparation',
    skills: [
      {
        id: 'preparation-brew-potions',
        name: 'Brew Potions',
        category: 'preparation',
        cost: 3,
        prerequisites: [],
        description:
          'You can brew potions that assist you in battle or raise your stats.',
        bonuses: [],
      },
    ],
  },
  {
    id: 'stuff',
    name: 'Stuff',
    skills: [
      {
        id: 'stuff-gut-animal',
        name: 'Gut Animal',
        category: 'stuff',
        cost: 2,
        prerequisites: [],
        description:
          'You can remove the claws and teeth of some animals. Claws can be sold; Teeth can be used for crafting.',
        bonuses: [],
      },
      {
        id: 'stuff-skin-animals',
        name: 'Skin Animals',
        category: 'stuff',
        cost: 2,
        prerequisites: [],
        description:
          'You can skin some animals. You can sell the skins or use them for crafting.',
        bonuses: [],
      },
      {
        id: 'stuff-extract-ichor',
        name: 'Extract Ichor',
        category: 'stuff',
        cost: 2,
        prerequisites: [],
        description:
          'You can extract ichor from certain animals. Ichor is required for brewing potions and for crafting.',
        bonuses: [],
      },
    ],
  },
  {
    id: 'lockpicking',
    name: 'Lockpicking',
    skills: [
      {
        id: 'lockpicking-complex',
        name: 'Pick Complex Locks',
        category: 'lockpicking',
        cost: 2,
        prerequisites: [],
        description:
          'No lock is safe from you anymore.',
        bonuses: [],
      },
    ],
  },
]

const allSkills = SKILL_CATEGORIES.flatMap((c) => c.skills)
export const SKILL_MAP = new Map(allSkills.map((s) => [s.id, s]))
