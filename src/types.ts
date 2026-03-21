export interface Bonus {
  type: string
  label: string
  value: number
  unit: string
}

export interface Skill {
  id: string
  name: string
  category: string
  cost: number
  prowess?: number
  prerequisites: string[]
  description: string
  ability?: {
    name: string
    description: string
  }
  bonuses: Bonus[]
}

export interface SkillCategory {
  id: string
  name: string
  skills: Skill[]
}
