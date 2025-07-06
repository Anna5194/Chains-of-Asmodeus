/*
let d20 = Math.floor(Math.random() * 20);
let d100 = Math.floor(Math.random() * 100);
let d10 = Math.floor(Math.random() * 10);
let d8 = Math.floor(Math.random() * 8);
let d6 = Math.floor(Math.random() * 6);
let d4 = Math.floor(Math.random() * 4);
 */


class Monster {
  constructor(name, about, strength, dexterity, physique, intelligence, wisdom, charisma, parentSelector) {
    this.name = name;
    this.initiative = 0; // Будет рассчитываться индивидуально
    this.about = about;
    this.hit = 0;
    this.strength = strength;
    this.currentStrength = 0;
    this.dexterity = dexterity;
    this.currentDexterity = 0;
    this.physique = physique;
    this.currentPhysique = 0;
    this.intelligence = intelligence;
    this.currentIntelligence = 0;
    this.wisdom = wisdom;
    this.currentWisdom = 0;
    this.charisma = charisma;
    this.currentCharisma = 0;
    this.parent = document.querySelector(parentSelector);
    this.element = null;
    this.healthValues = [];
    this.healthResults = [];
  }

  // Базовый метод (будет переопределяться)
  rollInitiative() {
    throw new Error('Метод rollInitiative должен быть реализован в подклассе');
  }

  rollhit() {
    throw new Error('Метод rollhit должен быть реализован в подклассе');
  }

  rollstrength() {
    throw new Error('Метод rollstrength должен быть реализован в подклассе');
  }

  rolldexterity() {
    throw new Error('Метод rolldexterity должен быть реализован в подклассе');
  }

  rollphysique() {
    throw new Error('Метод rollphysique должен быть реализован в подклассе');
  }

  rollintelligence() {
    throw new Error('Метод rollintelligence должен быть реализован в подклассе');
  }

  rollwisdom() {
    throw new Error('Метод rollwisdom должен быть реализован в подклассе');
  }

  rollcharisma() {
    throw new Error('Метод rollcharisma должен быть реализован в подклассе');
  }

  rollHealth(){
    throw new Error('Метод rollHealth должен быть реализован в подклассе');
  }

  rollAbility(abilityName) {
    const abilityValue = this[abilityName]; // Получаем базовое значение характеристики
    const roll = Math.floor(Math.random() * 20) + 1; // Бросок d20
    const result = roll + abilityValue; // Итоговый результат
    this[`current${abilityName.charAt(0).toUpperCase() + abilityName.slice(1)}`] = result; // Сохраняем результат
    return result;
  }

  rollstrength() {
    return this.rollAbility('strength');
  }

  rolldexterity() {
    return this.rollAbility('dexterity');
  }

  rollphysique() {
    return this.rollAbility('physique');
  }

  rollintelligence() {
    return this.rollAbility('intelligence');
  }

  rollwisdom() {
    return this.rollAbility('wisdom');
  }

  rollcharisma() {
    return this.rollAbility('charisma');
  }

  render() {
    this.element = document.createElement('div');
    this.element.innerHTML = `
      <h1>${this.name}</h1>
      <p>${this.about}</p>
      <div class="initiative">
          <h3>Инициатива: </h3>
          <button class="initiative-btn">Инициатива</button>
          <p>${this.initiative}</p>
      </div>
      <div class="attack">
          <div class="hit">
          <h3>Попадание:</h3>
              <button class="hit-btn">Попадание</button>
              <p>${this.hit}</p> 
          </div>
          <div class="damage">
              <h3>Урон:</h3>
          </div>
          <div class="saving-throws">
            <h3>Спасброски:</h3>
            <div class="strength">
              <button class="strength-btn">Сила</button>
              <p>${this.strength}</p>
            </div>
            <div class="dexterity">
              <button class="dexterity-btn">Ловкость</button>
              <p>${this.dexterity}</p>
            </div>
            <div class="physique">
              <button class="physique-btn">Телосложение</button>
              <p>${this.physique}</p>
            </div>
            <div class="intelligence">
              <button class="intelligence-btn">Интеллект</button>
              <p>${this.intelligence}</p>
            </div>
            <div class="wisdom">
              <button class="wisdom-btn">Мудрость</button>
              <p>${this.wisdom}</p>
            </div>
            <div class="charisma">
              <button class="charisma-btn">Харизма</button>
              <p>${this.charisma}</p>
            </div>
          </div>
      </div>
      <div class="health">
        <button class="health-btn">Сгенерировать здоровье</button>
        <button class="health-clean-btn">Очистить здоровье</button>
        <div class="health-results"></div>
      </div>
      `;
    this.element.querySelector('.initiative-btn').addEventListener('click', () => {
      this.rollInitiative();
      this.updateInitiativeDisplay();
    });

    this.element.querySelector('.hit-btn').addEventListener('click', () => {
      this.rollhit()
      this.updateHitDisplay();
    });

    this.element.querySelector('.strength-btn').addEventListener('click', () =>{
      this.rollstrength();
      this.updateStrengthDisplay();
    })

    this.element.querySelector('.dexterity-btn').addEventListener('click', () =>{
      this.rolldexterity();
      this.updateDexterityDisplay();
    })

    this.element.querySelector('.physique-btn').addEventListener('click', () =>{
      this.rollphysique();
      this.updatePhysiqueDisplay();
    })

    this.element.querySelector('.intelligence-btn').addEventListener('click', () =>{
      this.rollintelligence();
      this.updateIntelligenceDisplay();
    })

    this.element.querySelector('.wisdom-btn').addEventListener('click', () =>{
      this.rollwisdom();
      this.updateWisdomDisplay();
    })

    this.element.querySelector('.charisma-btn').addEventListener('click', () =>{
      this.rollcharisma();
      this.updateCharismaDisplay();
    })

    this.element.querySelector('.health-btn').addEventListener('click', () => {
      const healthValue = this.rollHealth();
      this.addHealthValue(healthValue);
    });

    this.element.querySelector('.health-clean-btn').addEventListener('click', () => {
      this.clearHealthValues();
    });
    
    this.parent.append(this.element);
  }
  updateInitiativeDisplay() {
    if (this.element) {
      this.element.querySelector('.initiative p').textContent = this.initiative;
    }
  }

  updateHitDisplay() {
    if (this.element) {
      this.element.querySelector('.hit p').textContent = this.hit;
    }
  }

  updateStrengthDisplay() {
    if (this.element) {
      this.element.querySelector('.strength p').textContent = this.currentStrength;
    }
  }

  updateDexterityDisplay() {
    if (this.element) {
      this.element.querySelector('.dexterity p').textContent = this.currentDexterity;
    }
  }

  updatePhysiqueDisplay() {
    if (this.element) {
      this.element.querySelector('.physique p').textContent = this.currentPhysique;
    }
  }

  updateIntelligenceDisplay() {
    if (this.element) {
      this.element.querySelector('.intelligence p').textContent = this.currentIntelligence;
    }
  }

  updateWisdomDisplay() {
    if (this.element) {
      this.element.querySelector('.wisdom p').textContent = this.currentWisdom;
    }
  }

  updateCharismaDisplay() {
    if (this.element) {
      this.element.querySelector('.charisma p').textContent = this.currentCharisma;
    }
  }

  updateDamageDisplay(damageType, value) {
    if (this.element) {
      const element = this.element.querySelector(`.${damageType}-damage p`);
      if (element) {
        element.textContent = value;
      }
    }
  }

  addHealthValue(value) {
    this.healthResults.push({
        base: value,
        current: value,
        reductions: [] // Массив для хранения истории вычитаний
    });
    this.updateHealthDisplay();
  }

  clearHealthValues() {
    this.healthResults = [];
    this.updateHealthDisplay();
  }

  updateHealthDisplay() {
    const healthResultsContainer = this.element.querySelector('.health-results');
    if (!healthResultsContainer) return;

    healthResultsContainer.innerHTML = '';

    this.healthResults.forEach((result, index) => {
        const healthItem = document.createElement('div');
        healthItem.className = 'health-item';
        
        // Создаем строку с историей изменений
        let displayString = `${result.base}`;
        let currentValue = result.base;
        
        if (result.reductions) {
            result.reductions.forEach(reduction => {
                displayString += `-${reduction}=${currentValue - reduction}`;
                currentValue -= reduction;
            });
        }
        
        healthItem.innerHTML = `
            <p>${displayString}</p>
            <input type="number" class="health-input" data-index="${index}" size="10" placeholder="Уменьшить на...">
        `;

        const input = healthItem.querySelector('.health-input');
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const reduction = parseInt(input.value);
                if (!isNaN(reduction)) {
                    // Инициализируем массив reductions если его нет
                    if (!this.healthResults[index].reductions) {
                        this.healthResults[index].reductions = [];
                    }
                    this.healthResults[index].reductions.push(reduction);
                    this.updateHealthDisplay();
                }
                input.value = '';
            }
        });

        healthResultsContainer.appendChild(healthItem);
    });
  }

}

class BeardedDevil extends Monster {
  rollInitiative() {
    this.initiative = Math.floor(Math.random() * 20) + 2;
    return this.initiative;
  }
  rollhit(){
    this.hit = Math.floor(Math.random() * 20) + 5;
    return this.hit;
  }
  
  rollBeardDamage() {
    const damage = Math.floor(Math.random() * 8) + 2;
    this.updateDamageDisplay('beard', damage);
    return damage;
  }
  
  rollGlaiveDamage() {
    const damage = Math.floor(Math.random() * 10) + 3;
    this.updateDamageDisplay('glaive', damage);
    return damage;
  }

  rollHealth(){
    let health = 0;
    for (let i = 0; i < 7; i++) {
      health += Math.floor(Math.random() * 8) + 1;
    }
    return health + 16;
  }

  render() {
    super.render(); // Вызываем родительский render
    
    // Добавляем специфичные для BeardedDevil элементы урона
    const damageDiv = this.element.querySelector('.damage');
    damageDiv.innerHTML += `
      <div class="beard-damage">
        <button class="beard-damage-btn">Борода урон</button>
        <p>0</p>
      </div>
      <div class="glaive-damage">
        <button class="glaive-damage-btn">Глефа урон</button>
        <p>0</p>
      </div>
    `;
    
    // Добавляем обработчики
    this.element.querySelector('.beard-damage-btn').addEventListener('click', () => {
      this.rollBeardDamage();
    });
    
    this.element.querySelector('.glaive-damage-btn').addEventListener('click', () => {
      this.rollGlaiveDamage();
    });
  }
}

class HornedDevil extends Monster {
  rollInitiative() {
    this.initiative = Math.floor(Math.random() * 20) + 3;
    return this.initiative;
  }
  rollhit(){
    this.hit = Math.floor(Math.random() * 20) + 10;
    return this.hit;
  }
  
  rollPitchforkDamage() {
    const damage = Math.floor(Math.random() * 8) + Math.floor(Math.random() * 8) + 6;
    this.updateDamageDisplay('pitchfork', damage);
    return damage;
  }
  
  rollTailDamage() {
    const damage = Math.floor(Math.random() * 8) + 6;
    this.updateDamageDisplay('tail', damage);
    return damage;
  }

  rollDopTailDamage() {
    const damage = Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6);
    this.updateDamageDisplay('doptail', damage);
    return damage;
  }

  rollHealth(){
    let health = 0;
    for (let i = 0; i < 16; i++) {
      health += Math.floor(Math.random() * 10) + 1;
    }
    return health + 85;
  }

  render() {
    super.render(); // Вызываем родительский render
    
    // Добавляем специфичные для BeardedDevil элементы урона
    const damageDiv = this.element.querySelector('.damage');
    damageDiv.innerHTML += `
      <div class="pitchfork-damage">
        <button class="pitchfork-damage-btn">Вилы урон</button>
        <p>0</p>
      </div>
      <div class="tail-damage">
        <button class="tail-damage-btn">Хвост урон</button>
        <p>0</p>
      </div>
      <div class="doptail-damage">
        <button class="doptail-damage-btn">Дополнительный урон хвост</button>
        <p>0</p>
      </div>
    `;
    
    // Добавляем обработчики
    this.element.querySelector('.pitchfork-damage-btn').addEventListener('click', () => {
      this.rollPitchforkDamage();
    });
    
    this.element.querySelector('.tail-damage-btn').addEventListener('click', () => {
      this.rollTailDamage();
    });

    this.element.querySelector('.doptail-damage-btn').addEventListener('click', () => {
      this.rollDopTailDamage();
    });

  }
}

class BoneDevil extends Monster {
  rollInitiative() {
    this.initiative = Math.floor(Math.random() * 20) + 3;
    return this.initiative;
  }
  rollhit(){
    this.hit = Math.floor(Math.random() * 20) + 8;
    return this.hit;
  }
  
  rollClawChoppingDamage() {
    const damage = Math.floor(Math.random() * 8) + 4;
    this.updateDamageDisplay('clawchopping', damage);
    return damage;
  }
  
  rollStingPiercingDamage() {
    const damage = Math.floor(Math.random() * 8) + Math.floor(Math.random() * 8) + 4;
    this.updateDamageDisplay('stingpiercing', damage);
    return damage;
  }

  rollStingPoisonDamage() {
    const damage = Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6);
    this.updateDamageDisplay('stingpoison', damage);
    return damage;
  }

  rollHealth(){
    let health = 0;
    for (let i = 0; i < 14; i++) {
      health += Math.floor(Math.random() * 10) + 1;
    }
    return health + 60;
  }

  render() {
    super.render(); // Вызываем родительский render
    
    // Добавляем специфичные для BeardedDevil элементы урона
    const damageDiv = this.element.querySelector('.damage');
    damageDiv.innerHTML += `
      <div class="clawchopping-damage">
        <button class="clawchopping-damage-btn">Коготь рубящий</button>
        <p>0</p>
      </div>
      <div class="stingpiercing-damage">
        <button class="stingpiercing-damage-btn">Жало колющий</button>
        <p>0</p>
      </div>
      <div class="stingpoison-damage">
        <button class="stingpoison-damage-btn">Жало ядом</button>
        <p>0</p>
      </div>
    `;
    
    // Добавляем обработчики
    this.element.querySelector('.clawchopping-damage-btn').addEventListener('click', () => {
      this.rollClawChoppingDamage();
    });
    
    this.element.querySelector('.stingpiercing-damage-btn').addEventListener('click', () => {
      this.rollStingPiercingDamage();
    });

    this.element.querySelector('.stingpoison-damage-btn').addEventListener('click', () => {
      this.rollStingPoisonDamage();
    });

  }
}

class Shredwing extends Monster {
  rollInitiative() {
    this.initiative = Math.floor(Math.random() * 20) + 4;
    return this.initiative;
  }
  rollhit(){
    this.hit = Math.floor(Math.random() * 20) + 8;
    return this.hit;
  }
  
  rollClawChoppingDamage() {
    const damage = Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 4;
    this.updateDamageDisplay('clawchopping', damage);
    return damage;
  }
  
  rollClawPoisonDamage() {
    const damage = Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6);
    this.updateDamageDisplay('clawpoison', damage);
    return damage;
  }

  rollFusionNecroticDamage() {
    const damage = Math.floor(Math.random() * 12) + Math.floor(Math.random() * 12) + Math.floor(Math.random() * 12) + Math.floor(Math.random() * 12) + Math.floor(Math.random() * 12);
    this.updateDamageDisplay('fusionnecrotic', damage);
    return damage;
  }

  rollHealth(){
    let health = 0;
    for (let i = 0; i < 19; i++) {
      health += Math.floor(Math.random() * 8) + 1;
    }
    return health + 80;
  }

  render() {
    super.render(); // Вызываем родительский render
    
    const damageDiv = this.element.querySelector('.damage');
    damageDiv.innerHTML += `
      <div class="clawchopping-damage">
        <button class="clawchopping-damage-btn">Когти рубящий</button>
        <p>0</p>
      </div>
      <div class="clawpoison-damage">
        <button class="clawpoison-damage-btn">Когти ядом</button>
        <p>0</p>
      </div>
      <div class="fusionnecrotic-damage">
        <button class="fusionnecrotic-damage-btn">Слияние некротика</button>
        <p>0</p>
      </div>
    `;
    
    this.element.querySelector('.clawchopping-damage-btn').addEventListener('click', () => {
      this.rollClawChoppingDamage();
    });
    
    this.element.querySelector('.clawpoison-damage-btn').addEventListener('click', () => {
      this.rollClawPoisonDamage();
    });

    this.element.querySelector('.fusionnecrotic-damage-btn').addEventListener('click', () => {
      this.rollFusionNecroticDamage();
    });

  }
}

class Hezrou extends Monster {
  rollInitiative() {
    this.initiative = Math.floor(Math.random() * 20) + 3;
    return this.initiative;
  }
  rollhit(){
    this.hit = Math.floor(Math.random() * 20) + 7;
    return this.hit;
  }
  
  rollClawDamage() {
    const damage = Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + 4;
    this.updateDamageDisplay('claw', damage);
    return damage;
  }
  
  rollBiteDamage() {
    const damage = Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 4;
    this.updateDamageDisplay('bite', damage);
    return damage;
  }

  rollHealth(){
    let health = 0;
    for (let i = 0; i < 12; i++) {
      health += Math.floor(Math.random() * 10) + 1;
    }
    return health + 65;
  }

  render() {
    super.render(); // Вызываем родительский render
    
    const damageDiv = this.element.querySelector('.damage');
    damageDiv.innerHTML += `
      <div class="claw-damage">
        <button class="claw-damage-btn">Укус колющий</button>
        <p>0</p>
      </div>
      <div class="bite-damage">
        <button class="bite-damage-btn">Коготь рубящий</button>
        <p>0</p>
      </div>
    `;
    
    this.element.querySelector('.claw-damage-btn').addEventListener('click', () => {
      this.rollClawDamage();
    });
    
    this.element.querySelector('.bite-damage-btn').addEventListener('click', () => {
      this.rollBiteDamage();
    });

  }
}

class PurpleWorm extends Monster {
  rollInitiative() {
    this.initiative = Math.floor(Math.random() * 20) - 2;
    return this.initiative;
  }
  rollhit(){
    this.hit = Math.floor(Math.random() * 20) + 14;
    return this.hit;
  }

  rollHealth(){
    let health = 0;
    for (let i = 0; i < 14; i++) {
      health += Math.floor(Math.random() * 20) + 1;
    }
    return health + 90;
  }
  
  rollBitePiercingDamage() {
    const damage = Math.floor(Math.random() * 8) + Math.floor(Math.random() * 8) + Math.floor(Math.random() * 8) + 9;
    this.updateDamageDisplay('bitepiercing', damage);
    return damage;
  }
  
  rollBiteAcidDamage() {
    const damage = Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6);
    this.updateDamageDisplay('biteacid', damage);
    return damage;
  }

  rollStingPiercingDamage() {
    const damage = Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 9;
    this.updateDamageDisplay('stingpiercing', damage);
    return damage;
  }

    rollStingPoisonDamage() {
    const damage = Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6);
    this.updateDamageDisplay('stingpoison', damage);
    return damage;
  }

  render() {
    super.render(); // Вызываем родительский render
    
    const damageDiv = this.element.querySelector('.damage');
    damageDiv.innerHTML += `
      <div class="bitepiercing-damage">
        <button class="bitepiercing-damage-btn">Укус колющий</button>
        <p>0</p>
      </div>
      <div class="biteacid-damage">
        <button class="biteacid-damage-btn">Укус кислота</button>
        <p>0</p>
      </div>
      <div class="stingpiercing-damage">
        <button class="stingpiercing-damage-btn">Жало колющий</button>
        <p>0</p>
      </div>
      <div class="stingpoison-damage">
        <button class="stingpoison-damage-btn">Жало яд</button>
        <p>0</p>
      </div>
    `;
    
    this.element.querySelector('.bitepiercing-damage-btn').addEventListener('click', () => {
      this.rollBitePiercingDamage();
    });
    
    this.element.querySelector('.biteacid-damage-btn').addEventListener('click', () => {
      this.rollBiteAcidDamage();
    });

    this.element.querySelector('.stingpiercing-damage-btn').addEventListener('click', () => {
      this.rollStingPiercingDamage();
    });

    this.element.querySelector('.stingpoison-damage-btn').addEventListener('click', () => {
      this.rollStingPoisonDamage();
    });
  }
}

class Merregon extends Monster {
  rollInitiative() {
    this.initiative = Math.floor(Math.random() * 20) + 2;
    return this.initiative;
  }
  rollhit(){
    this.hit = Math.floor(Math.random() * 20) + 5;
    return this.hit;
  }

  rollHealth(){
    let health = 0;
    for (let i = 0; i < 5; i++) {
      health += Math.floor(Math.random() * 8) + 1;
    }
    return health + 18;
  }
  
  rollHalberdDamage() {
    const damage = Math.floor(Math.random() * 10) + 4;
    this.updateDamageDisplay('halberd', damage);
    return damage;
  }
  
  rollHeavyCrossbowDamage() {
    const damage = Math.floor(Math.random() * 10) + 2;
    this.updateDamageDisplay('heavycrossbow', damage);
    return damage;
  }

  render() {
    super.render(); // Вызываем родительский render
    
    const damageDiv = this.element.querySelector('.damage');
    damageDiv.innerHTML += `
      <div class="halberd-damage">
        <button class="halberd-damage-btn">Алебарда</button>
        <p>0</p>
      </div>
      <div class="heavycrossbow-damage">
        <button class="heavycrossbow-damage-btn">Тяжёлый арбалет</button>
        <p>0</p>
      </div>
    `;
    
    this.element.querySelector('.halberd-damage-btn').addEventListener('click', () => {
      this.rollHalberdDamage();
    });
    
    this.element.querySelector('.heavycrossbow-damage-btn').addEventListener('click', () => {
      this.rollHeavyCrossbowDamage();
    });
  }
}

class SpikyDevil extends Monster {
  rollInitiative() {
    this.initiative = Math.floor(Math.random() * 20) + 3;
    return this.initiative;
  }
  rollhit(){
    this.hit = Math.floor(Math.random() * 20) + 6;
    return this.hit;
  }

  rollHealth(){
    let health = 0;
    for (let i = 0; i < 12; i++) {
      health += Math.floor(Math.random() * 8) + 1;
    }
    return health + 52;
  }
  
  rollСlawDamage() {
    const damage = Math.floor(Math.random() * 6) + 3;
    this.updateDamageDisplay('claw', damage);
    return damage;
  }
  
  rollTailDamage() {
    const damage = Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 3;
    this.updateDamageDisplay('tail', damage);
    return damage;
  }

  rollFlameThrowingDamage() {
    const damage = Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6);
    this.updateDamageDisplay('flamethrowing', damage);
    return damage;
  }

  render() {
    super.render(); // Вызываем родительский render
    
    const damageDiv = this.element.querySelector('.damage');
    damageDiv.innerHTML += `
      <div class="claw-damage">
        <button class="claw-damage-btn">Коготь колющий</button>
        <p>0</p>
      </div>
      <div class="tail-damage">
        <button class="tail-damage-btn">Хвост колющий</button>
        <p>0</p>
      </div>
      <div class="flamethrowing-damage">
        <button class="flamethrowing-damage-btn">Метание пламенем</button>
        <p>0</p>
      </div>
    `;
    
    this.element.querySelector('.claw-damage-btn').addEventListener('click', () => {
      this.rollСlawDamage();
    });
    
    this.element.querySelector('.tail-damage-btn').addEventListener('click', () => {
      this.rollTailDamage();
    });

    this.element.querySelector('.flamethrowing-damage-btn').addEventListener('click', () => {
      this.rollFlameThrowingDamage();
    });
  }
}

class ShadowDevil extends Monster {
  rollInitiative() {
    this.initiative = Math.floor(Math.random() * 20) + 3;
    return this.initiative;
  }
  rollhit(){
    this.hit = Math.floor(Math.random() * 20) + 5;
    return this.hit;
  }

  rollHealth(){
    let health = 0;
    for (let i = 0; i < 11; i++) {
      health += Math.floor(Math.random() * 8) + 1;
    }
    return health + 12;
  }

  rollСlawsDamage() {
    const damage = Math.floor(Math.random() * 6) + 3;
    this.updateDamageDisplay('claws', damage);
    return damage;
  }
  
  rollHideDamage() {
    const damage = Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 3;
    this.updateDamageDisplay('hide', damage);
    return damage;
  }

  render() {
    super.render(); // Вызываем родительский render
    
    const damageDiv = this.element.querySelector('.damage');
    damageDiv.innerHTML += `
      <div class="claws-damage">
        <button class="claws-damage-btn">Когти</button>
        <p>0</p>
      </div>
      <div class="hide-damage">
        <button class="hide-damage-btn">Спрятаться</button>
        <p>0</p>
      </div>
    `;
    
    this.element.querySelector('.claws-damage-btn').addEventListener('click', () => {
      this.rollСlawsDamage();
    });
    
    this.element.querySelector('.hide-damage-btn').addEventListener('click', () => {
      this.rollHideDamage();
    });
  }
}

class Marilith extends Monster {
  rollInitiative() {
    this.initiative = Math.floor(Math.random() * 20) + 5;
    return this.initiative;
  }
  rollhit(){
    this.hit = Math.floor(Math.random() * 20) + 9;
    return this.hit;
  }

  rollHealth(){
    let health = 0;
    for (let i = 0; i < 17; i++) {
      health += Math.floor(Math.random() * 10) + 1;
    }
    return health + 90;
  }

  rollLongSwordDamage() {
    const damage = Math.floor(Math.random() * 8) + Math.floor(Math.random() * 8) + 4;
    this.updateDamageDisplay('longsword', damage);
    return damage;
  }
  
  rollTailDamage() {
    const damage = Math.floor(Math.random() * 10) + Math.floor(Math.random() * 10) + 4;
    this.updateDamageDisplay('tail', damage);
    return damage;
  }

  render() {
    super.render(); // Вызываем родительский render
    
    const damageDiv = this.element.querySelector('.damage');
    damageDiv.innerHTML += `
      <div class="longsword-damage">
        <button class="longsword-damage-btn">Длинный меч</button>
        <p>0</p>
      </div>
      <div class="tail-damage">
        <button class="tail-damage-btn">Хвост</button>
        <p>0</p>
      </div>
    `;
    
    this.element.querySelector('.longsword-damage-btn').addEventListener('click', () => {
      this.rollLongSwordDamage();
    });
    
    this.element.querySelector('.tail-damage-btn').addEventListener('click', () => {
      this.rollTailDamage();
    });
  }
}

new BeardedDevil(
  "Бородатый Дьявол",
  "КД 13</br><b>Сопротивление</b> к урону холод; дробящий, колющий и рубящий урон от немагических атак, а также от немагического оружия, которое при этом не посеребрено </br> <b>Иммунитет</b> к урону огонь, яд </br> <b>Иммунитет</b> к состояниям отравление </br> Чувства тёмное зрение 120 фт., пассивная Внимательность 10. </br> <b>Дьявольское зрение.</b> Магическая тьма не мешает тёмному зрению дьявола.</br><b>Сопротивление магии</b>.Бородатый дьявол совершает с преимуществом спасброски от заклинаний и прочих магических эффектов.</br><b>Уверенный</b>.Дьявол не может быть испуган, если видит в пределах 30 футов от себя союзное существо. </br> <b>Мультиатака</b>. Дьявол совершает две атаки: одну Бородой и одну Глефой. </ br><b>Борода</b>. Рукопашная атака оружием: +5 к попаданию, досягаемость 5 фт., одно существо. Попадание: 6 (1к8 + 2) колющего урона, и цель должна преуспеть в спасброске Телосложения со Сл 12, иначе станет отравленной таким образом, цель не может восстанавливать хиты. Цель может повторять этот спасбросок в конце каждого своего хода, оканчивая эффект на себе при успехе. </ br> <b>Глефа.</b> Рукопашная атака оружием: +5 к попаданию, досягаемость 10 фт., одна цель. Попадание: 8 (1к10 + 3) рубящего урона. Если цель — существо, не являющееся ни нежитью, ни конструктом, она должна преуспеть в спасброске Телосложения со Сл 12, иначе будет терять 5 (1к10) хитов в начале каждого своего хода из-за инфернальной раны.</br>Каждый раз, когда демон попадает этой атакой по цели, уже имеющей эту рану, урон от раны увеличивается на 5 (1к10). Любое существо может залечить рану, если Действием совершит успешную проверку Мудрости (Медицина) со Сл 12. Эта рана также закрывается, если цель получит магическое лечение.",
  5, 2, 4, -1, 2, 0, // характеристики
  ".bearded-devil"
).render();

new HornedDevil(
  "Рогатый Дьявол", 
  "КД 18</br><b>Сопротивление</b> к урону холод; дробящий, колющий и рубящий урон от немагических атак, а также от немагического оружия, которое при этом не посеребрено</br><b>Иммунитет</b> к урону огонь, яд</br><b>Иммунитет</b> к состояниям отравление</br>Чувства тёмное зрение 120 фт., пассивная Внимательность 13</br><b>Языки</b> Инфернальный, телепатия 120 фт.Дьявольское зрение.</br>Магическая тьма не мешает тёмному зрению дьявола.</br><b>Сопротивление магии</b>.Рогатый дьявол совершает с преимуществом спасброски от заклинаний и прочих магических эффектов.</br><b>Мультиатака</b>.Дьявол совершает три рукопашные атаки: две Вилами и одну Хвостом. Он может использовать Метание пламени вместо любой рукопашной атаки.</br><b>Вилы</b>.Рукопашная атака оружием: +10 к попаданию, досягаемость 10 фт., одна цель. Попадание: 15 (2к8 + 6) колющего урона.</br><b>Хвост</b>.Рукопашная атака оружием: +10 к попаданию, досягаемость 10 фт., одна цель. Попадание: 10 (1к8 + 6) колющего урона. Если цель — существо, не являющееся ни нежитью, ни конструктом, она должна преуспеть в <b>спасброске Телосложения со Сл 17</b>, иначе будет терять 10 (3к6) хитов в начале каждого своего хода из-за инфернальной раны.Каждый раз, когда демон попадает этой атакой по цели, уже имеющей эту рану, урон от раны увеличивается на 10 (3к6). Любое существо может залечить рану, если Действием совершит успешную проверку Мудрости (Медицина) со Сл 12. Эта рана также закрывается, если цель получит магическое лечение.</br><b>Метание пламени</b>.Дальнобойная атака заклинанием: +7 к попаданию, дистанция 150 фт., одна цель. Попадание: 14 (4к6) урона огнём. Если цель — горючий предмет, который никто не несёт и не носит, она также загорается.",
  10, 7, 5, 1, 7, 7,
  ".horned-devil"
).render();

new BoneDevil(
  "Костяной Дьявол",
  "КД 19</br><b>Сопротивление</b> к урону холод; дробящий, колющий и рубящий урон от немагических атак, а также от немагического оружия, которое при этом не посеребрено</br><b>Иммунитет</b> к урону огонь, яд, отравление</br>Чувства тёмное зрение 120 фт., пассивная Внимательность 12</br><b>Языки</b> Инфернальный, телепатия 120 фт.</br><b>Дьявольское зрение</b>.Магическая тьма не мешает тёмному зрению дьявола.</br><b>Сопротивление магии</b>.Костяной дьявол совершает с преимуществом спасброски от заклинаний и прочих магических эффектов.</br><b>Мультиатака</b>.Дьявол совершает три атаки: две когтями, и одну жалом.</br><b>Коготь</b>.Рукопашная атака оружием: +8 к попаданию, досягаемость 10 фт., одна цель. Попадание: 8 (1к8 + 4) рубящего урона.</br><b>Жало</b>.Рукопашная атака оружием: +8 к попаданию, досягаемость 10 фт., одна цель. Попадание: 13 (2к8 + 4) колющего урона плюс 17 (5к6) урона ядом, и цель должна преуспеть в спасброске Телосложения со Сл 14, иначе станет отравленной на 1 минуту. Цель может повторять этот спасбросок в конце каждого своего хода, оканчивая эффект на себе при успехе.", 
  4, 3, 4, 5, 6, 7,
  ".bone-devil"
).render();

new Shredwing(
  "Клококрыл",
  "КД 21</br> <b>Сопротивление</b> к урону огонь, холод, яд; дробящий, колющий и рубящий урон от немагического оружия, которое не посеребрено </br><b>Иммунитет</b> к состоянию ослепление, отравление, очарование </br>Чувства темное зрение 120 фт, пассивная Внимательность 21 </br><b>Слияние</b>. Если после использования действия Проникновение клококрыл сливается с другим существом, любой урон, нанесенный клококрылу, распределяется поровну между ним и существом, с которым он слился. </br><b>Мультиатака.</b> Клококрыл совершает три атаки когтями. </br><b>Когти.</b> Рукопашная атака оружием: +8 к попаданию, досягаемость 5 фт., одна цель. Попадание: 11 (2к6+4) рубящего урона, а также 7 (2к6) урона ядом. </br><b>Проникновение</b> (перезарядка 5–6). В случае попадания существо получает дополнительно 32 (5к12) рубящего урона, поскольку крылья клококрыла сливаются с ним. Во время слияния существо движется вместе с клококрылом и получает 19 (3к12) урона некротической энергией в начале каждого своего хода и считается захваченным. Клококрыл может отделиться от существа в любой момент, покинув существо и бросив его, если они находятся в воздухе. Другой способ прекратить слияние — убить клококрыла. Если существо умирает во время слияния, клококрыл навсегда захватывает его тело. Он получает кости хитов поглощённого существа, естественную броню, владения и языки. Если какая-либо характеристика поглощённого существа выше, чем у клококрыла, он также получает эту характеристику. Существо, навсегда слившееся с клококрылом, может быть воскрешено только с помощью заклинания исполнение желания или чего-то подобного. </br><b>Бонусным действием</b> Клококрыл может переместиться на свою скорость к враждебному существу, которое он видит", 
  1, 8, 8, 2, 3, 0,
  ".shredwing"
).render();

new Hezrou(
  "Хезроу",
  "КД 16</br><b>Сопротивление</b> к урону огонь, холод, электричество; дробящий, колющий и рубящий урон от немагических атак</br><b>Иммунитет</b> к урону яд, отравление</br>Чувства тёмное зрение 120 фт., пассивная Внимательность 11</br><b>Языки</b> Бездны, телепатия 120 фт.</br><b>Сопротивление магии</b>.Хезроу совершает с преимуществом спасброски от заклинаний и прочих магических эффектов.</br><b>Вонь</b>.Все существа, начинающие ход в пределах 10 футов от хезроу, должны преуспеть в спасброске Телосложения со Сл 14, иначе становятся отравленными до начала своего следующего хода. При успешном спасброске существо получает иммунитет к вони этого хезроу на 24 часа.</br><b>Мультиатака</b>.Хезроу совершает три атаки: одну Укусом и две Когтями.</br><b>Укус</b>.Рукопашная атака оружием: +7 к попаданию, досягаемость 5 фт., одна цель. Попадание: 15 (2к10 + 4) колющего урона.</br><b>Коготь</b>.Рукопашная атака оружием: +7 к попаданию, досягаемость 5 фт., одна цель. Попадание: 11 (2к6 + 4) рубящего урона.",
  7, 8, 5, -3, 4, 1,
  ".hezrou"
).render();

new PurpleWorm(
  "Лиловый червь",
  "КД 18</br>Чувства слепое зрение 30 фт., чувство вибрации 60 фт., пассивная Внимательность 9</br><b>Прокладывание туннеля</b>.Червь может копать сквозь сплошной камень со скоростью копания, уменьшенной вдвое, оставляя за собой туннель диаметром 10 футов.</br><b>Мультиатака.</b>Червь совершает две атаки: одну Укусом, и одну Жалом.</br><b>Укус.</b>Рукопашная атака оружием: +14 к попаданию, досягаемость 10 фт., одна цель. Попадание: 22 (3к8 + 9) колющего урона.Если цель — существо с размером не больше Большого, она должна преуспеть в спасброске Ловкости со Сл 19, иначе будет проглочено. Проглоченное существо ослеплено и опутано, у него полное укрытие от атак и прочих эффектов, происходящих извне червя, и оно получает 21 (6к6) урона кислотой в начале каждого хода червя. Если червь получает 30 или больше урона за один ход от существа, находящегося внутри его, червь должен в конце этого хода преуспеть в спасброске Телосложения со Сл 21 иначе он отрыгнёт всех проглоченных существ, которые падают ничком в пространстве в пределах 10 футов от червя. Если червь умирает, проглоченное существо перестаёт быть опутанным им, и может высвободиться из трупа, потратив 20 футов перемещения, падая при выходе ничком.</br><b>Жало на хвосте</b>.Рукопашная атака оружием: +14 к попаданию, досягаемость 10 фт., одно существо. Попадание: 19 (3к6 + 9) колющего урона, и цель должна совершить спасбросок <b>Телосложения со Сл 19</b>, получая 42 (12к6) урона ядом при провале, или половину этого урона при успехе.",
  9, -2, 11, -5, -1, -3,
  ".purpleworm"
).render();

new Merregon(
  "Меррегон",
  "КД 16</br><b>Сопротивление</b> к урону холод; дробящий, колющий и рубящий урон от немагических атак, а также от немагического оружия, которое при этом не посеребрено</br><b>Иммунитет</b> к урону огонь, яд, испуг, отравление</br>Чувства тёмное зрение 60 фт., пассивная Внимательность 11</br><b>Языки</b> понимает Инфернальный, но не может говорить, телепатия 120 фт </br><b>Дьявольское зрение.</b>Магическая тьма не мешает тёмному зрению меррегона.</br><b>Сопротивление магии.</b>Меррегон совершает с преимуществом спасброски от заклинаний и прочих магических эффектов.</br><b>Мультиатака.</b>Меррегон совершает три атаки Алебардой.</br><b>Алебарда.</b>Рукопашная атака оружием: +6 к попаданию, досягаемость 10 фт., одна цель. Попадание: 9 (1к10 + 4) рубящего урона.</br><b>Тяжёлый арбалет.</b>Дальнобойная атака оружием: +4 к попаданию, дистанция 100/400 фт., одна цель. Попадание: 7 (1к10 + 2) колющего урона.</br><b>Реакция:Верный телохранитель.</b>Если другое исчадие в пределах 5 фт. от меррегона поражается атакой, меррегон подставляется под неё, получая урон вместо цели.",
  4, 2, 3, -2, 1, -1,
  ".merregon"
).render();

new SpikyDevil(
  "Шипастый демон",
  "КД 15</br><b>Сопротивление</b> к урону холод; дробящий, колющий и рубящий урон от немагических атак, а также от немагического оружия, которое при этом не посеребрено</br><b>Иммунитет</b> к урону огонь, яд, отравление</br>Чувства тёмное зрение 120 фт., пассивная Внимательность 18</br><b>Языки</b> Инфернальный, телепатия 120 фт</br><b>Шипастая шкура.</b>В начале каждого своего хода шипастый дьявол причиняет 5 (1к10) колющего урона всем схватившим его существам.</br><b>Дьявольское зрение.</b>Магическая тьма не мешает тёмному зрению дьявола.</br><b>Сопротивление магии.</b>Шипастый дьявол совершает с преимуществом спасброски от заклинаний и прочих магических эффектов.</br><b>Мультиатака.</b>Дьявол совершает три рукопашные атаки: одну Хвостом и две Когтями. В качестве альтернативы, он может дважды использовать Метание пламени.</br><b>Коготь.</b>Рукопашная атака оружием: +6 к попаданию, досягаемость 5 фт., одна цель. Попадание: 6 (1к6 + 3) колющего урона.</br><b>Хвост.</b>Рукопашная атака оружием: +6 к попаданию, досягаемость 5 фт., одна цель. Попадание: 10 (2к6 + 3) колющего урона.</br><b>Метание пламени.</b>Дальнобойная атака заклинанием: +5 к попаданию, дистанция 150 фт., одна цель. Попадание: 10 (3к6) урона огнём. Если цель — горючий предмет, который никто не несёт и не носит, она также загорается.",
  6, 3, 7, 1, 5, 5,
  ".spiky-devil"
).render();

new ShadowDevil(
  "Теневой демон",
  "КД 13</br><b>Уязвимость</b> к урону излучение</br><b>Сопротивление</b> к урону звук, кислота, некротическая энергия, огонь; дробящий, колющий и рубящий урон от немагических атак</br><b>Иммунитет</b> к урону холод, электричество, яд, истощение, захват, паралич, окаменение, отравление, сбивание с ног, опутанность</br>Чувства тёмное зрение 120 фт., пассивная Внимательность 11</br><b>Языки</b> Бездны, телепатия 120 фт</br><b>Бестелесное перемещение.</b>Демон может перемещаться сквозь других существ и предметы, как если бы они были труднопроходимой местностью. Он получает 5 (1к10) урона силовым полем, если оканчивает ход внутри предмета.</br><b>Чувствительность к свету.</b>Находясь на ярком свету, демон совершает с помехой броски атаки, а также проверки Мудрости (Внимательность), полагающиеся на зрение.</br><b>Скрытность в тени.</b>Находясь в области тусклого света или тьмы, демон может совершать действие Засада бонусным действием.</br><b>Когти.</b>Рукопашная атака оружием: +5 к попаданию, досягаемость 5 фт., одно существо. Попадание: 10 (2к6 + 3) урона психической энергией или если демон совершал бросок атаки с преимуществом 17 (4к6 + 3) урона психической энергией.",
  -5, 5, 1, 2, 1, 4,
  ".shadow-devil"
).render();

new Marilith(
  "Марилит",
  "КД 18 скорость 40</br><b>Сопротивление</b> к урону огонь, холод, электричество; дробящий, колющий и рубящий урон от немагических атак</br><b>Иммунитет</b> к урону яд, отравление</br>Чувства истинное зрение 120 фт., пассивная Внимательность 13</br><b>Языки</b> Бездны, телепатия 120 фт.</br><b>Сопротивление магии.</b>Марилит совершает с преимуществом спасброски от заклинаний и прочих магических эффектов.</br><b>Магическое оружие.</b>Атаки оружием марилит являются магическими.</br><b>Быстрая реакция.</b>Марилит может совершать по одной Реакции в каждом ходу сражения.</br><b>Мультиатака.</b>Марилит совершает семь атак: шесть Длинными мечами, и одну Хвостом.</br><b>Длинный меч.</b>Рукопашная атака оружием: +9 к попаданию, досягаемость 5 фт., одна цель. Попадание: 13 (2к8 + 4) рубящего урона.</br><b>Хвост.</b>Рукопашная атака оружием: +9 к попаданию, досягаемость 10 фт., одно существо. Попадание: 15 (2к10 + 4) дробящего урона. Если размер цели не больше Среднего, она становится схваченной (Сл высвобождения 19). Пока цель схвачена, она она становится опутана, марилит может автоматически попадать по цели хвостом, и марилит не может совершать атаки хвостом по другим целям.</br><b>Телепортация.</b>Марилит магическим образом телепортируется вместе со всем несомым и носимым снаряжением, на расстояние до 120 футов в свободное пространство, которое она видит.</br><b>Реакция: Парирование.</b>Марилит добавляет +5 к КД против одной рукопашной атаки, которая должна попасть по ней. Для этого марилит должна видеть атакующего, и должна использовать рукопашное оружие.",
  9, 5, 10, 4, 8, 10,
  ".marilith"
).render();
