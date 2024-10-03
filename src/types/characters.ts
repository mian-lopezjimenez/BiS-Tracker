export interface CharacterInfo {
  _links: Links;
  character: Character;
  equipped_items: EquippedItem[];
  equipped_item_sets: EquippedItemSet[];
}

export interface CharacterMedia {
  _links: Links;
  character: Character;
  assets: Asset[];
}

export interface Asset {
  key: string;
  value: string;
}

export interface Links {
  self: Self;
}

export interface Self {
  href: string;
}

export interface Character {
  key: Key;
  name: string;
  id: number;
  realm: Realm;
}

export interface Key {
  href: string;
}

export interface Realm {
  key: Key2;
  name: string;
  id: number;
  slug: string;
}

export interface Key2 {
  href: string;
}

export interface EquippedItem {
  item: Item;
  slot: Slot;
  quantity: number;
  context: number;
  bonus_list: number[];
  quality: Quality;
  name: string;
  modified_appearance_id?: number;
  media: Media;
  item_class: ItemClass;
  item_subclass: ItemSubclass;
  inventory_type: InventoryType;
  binding: Binding;
  armor?: Armor;
  stats: Stat[];
  sell_price: SellPrice;
  requirements: Requirements;
  set?: Set;
  level: Level2;
  transmog?: Transmog;
  durability?: Durability;
  is_subclass_hidden?: boolean;
  name_description?: NameDescription;
  enchantments?: Enchantment[];
  unique_equipped?: string;
  sockets?: Socket[];
  spells?: Spell[];
  weapon?: Weapon;
}

export interface Item {
  key: Key3;
  id: number;
}

export interface Key3 {
  href: string;
}

export interface Slot {
  type: string;
  name: string;
}

export interface Quality {
  type: string;
  name: string;
}

export interface Media {
  key: Key4;
  id: number;
}

export interface Key4 {
  href: string;
}

export interface ItemClass {
  key: Key5;
  name: string;
  id: number;
}

export interface Key5 {
  href: string;
}

export interface ItemSubclass {
  key: Key6;
  name: string;
  id: number;
}

export interface Key6 {
  href: string;
}

export interface InventoryType {
  type: string;
  name: string;
}

export interface Binding {
  type: string;
  name: string;
}

export interface Armor {
  value: number;
  display: Display;
}

export interface Display {
  display_string: string;
  color: Color;
}

export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface Stat {
  type: Type;
  value: number;
  display: Display2;
  is_negated?: boolean;
  is_equip_bonus?: boolean;
}

export interface Type {
  type: string;
  name: string;
}

export interface Display2 {
  display_string: string;
  color: Color2;
}

export interface Color2 {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface SellPrice {
  value: number;
  display_strings: DisplayStrings;
}

export interface DisplayStrings {
  header: string;
  gold: string;
  silver: string;
  copper: string;
}

export interface Requirements {
  level: Level;
  playable_classes?: PlayableClasses;
}

export interface Level {
  value: number;
  display_string: string;
}

export interface PlayableClasses {
  links: Link[];
  display_string: string;
}

export interface Link {
  key: Key7;
  name: string;
  id: number;
}

export interface Key7 {
  href: string;
}

export interface Set {
  item_set: ItemSet;
  items: Item2[];
  effects: Effect[];
  display_string: string;
}

export interface ItemSet {
  key: Key8;
  name: string;
  id: number;
}

export interface Key8 {
  href: string;
}

export interface Item2 {
  item: Item3;
  is_equipped?: boolean;
}

export interface Item3 {
  key: Key9;
  name: string;
  id: number;
}

export interface Key9 {
  href: string;
}

export interface Effect {
  display_string: string;
  required_count: number;
  is_active?: boolean;
}

export interface Level2 {
  value: number;
  display_string: string;
}

export interface Transmog {
  item: Item4;
  display_string: string;
  item_modified_appearance_id: number;
}

export interface Item4 {
  key: Key10;
  name: string;
  id: number;
}

export interface Key10 {
  href: string;
}

export interface Durability {
  value: number;
  display_string: string;
}

export interface NameDescription {
  display_string: string;
  color: Color3;
}

export interface Color3 {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface Enchantment {
  display_string: string;
  enchantment_id: number;
  enchantment_slot: EnchantmentSlot;
}

export interface EnchantmentSlot {
  id: number;
  type: string;
}

export interface Socket {
  socket_type: SocketType;
}

export interface SocketType {
  type: string;
  name: string;
}

export interface Spell {
  spell: Spell2;
  description: string;
}

export interface Spell2 {
  key: Key11;
  name: string;
  id: number;
}

export interface Key11 {
  href: string;
}

export interface Weapon {
  damage: Damage;
  attack_speed: AttackSpeed;
  dps: Dps;
}

export interface Damage {
  min_value: number;
  max_value: number;
  display_string: string;
  damage_class: DamageClass;
}

export interface DamageClass {
  type: string;
  name: string;
}

export interface AttackSpeed {
  value: number;
  display_string: string;
}

export interface Dps {
  value: number;
  display_string: string;
}

export interface EquippedItemSet {
  item_set: ItemSet2;
  items: Item5[];
  effects: Effect2[];
  display_string: string;
}

export interface ItemSet2 {
  key: Key12;
  name: string;
  id: number;
}

export interface Key12 {
  href: string;
}

export interface Item5 {
  item: Item6;
  is_equipped?: boolean;
}

export interface Item6 {
  key: Key13;
  name: string;
  id: number;
}

export interface Key13 {
  href: string;
}

export interface Effect2 {
  display_string: string;
  required_count: number;
  is_active?: boolean;
}

export enum Region {
  EU = "eu",
  US = "us",
}
