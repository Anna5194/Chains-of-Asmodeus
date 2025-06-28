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
      current: value
    });
    this.updateHealthDisplay();
  }

  clearHealthValues() {
    this.healthResults = [];
    this.updateHealthDisplay();
  }

  updateHealthDisplay() {
    const healthResultsContainer = this.element.querySelector('.health-results');
    if (!healthResultsContainer) return; // Защита от отсутствия элемента

    healthResultsContainer.innerHTML = '';

    this.healthResults.forEach((result, index) => {
      const healthItem = document.createElement('div');
      healthItem.className = 'health-item';
      healthItem.innerHTML = `
        <p>${result.current}</p>
        <input type="number" class="health-input" data-index="${index}" size="10" placeholder="Уменьшить на...">
      `;

      const input = healthItem.querySelector('.health-input');
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const reduction = parseInt(input.value);
          if (!isNaN(reduction)) {
            this.healthResults[index].current -= reduction;
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

new BeardedDevil(
  "Бородатый Дьявол",
  "<b>Сопротивление</b> к урону холод; дробящий, колющий и рубящий урон от немагических атак, а также от немагического оружия, которое при этом не посеребрено </br> <b>Иммунитет</b> к урону огонь, яд </br> <b>Иммунитет</b> к состояниям отравление </br> Чувства тёмное зрение 120 фт., пассивная Внимательность 10. </br> <b>Дьявольское зрение.</b> Магическая тьма не мешает тёмному зрению дьявола.</br><b>Сопротивление магии</b>.Бородатый дьявол совершает с преимуществом спасброски от заклинаний и прочих магических эффектов.</br><b>Уверенный</b>.Дьявол не может быть испуган, если видит в пределах 30 футов от себя союзное существо. </br> <b>Мультиатака</b>. Дьявол совершает две атаки: одну Бородой и одну Глефой. </ br><b>Борода</b>. Рукопашная атака оружием: +5 к попаданию, досягаемость 5 фт., одно существо. Попадание: 6 (1к8 + 2) колющего урона, и цель должна преуспеть в спасброске Телосложения со Сл 12, иначе станет отравленной таким образом, цель не может восстанавливать хиты. Цель может повторять этот спасбросок в конце каждого своего хода, оканчивая эффект на себе при успехе. </ br> <b>Глефа.</b> Рукопашная атака оружием: +5 к попаданию, досягаемость 10 фт., одна цель. Попадание: 8 (1к10 + 3) рубящего урона. Если цель — существо, не являющееся ни нежитью, ни конструктом, она должна преуспеть в спасброске Телосложения со Сл 12, иначе будет терять 5 (1к10) хитов в начале каждого своего хода из-за инфернальной раны.</br>Каждый раз, когда демон попадает этой атакой по цели, уже имеющей эту рану, урон от раны увеличивается на 5 (1к10). Любое существо может залечить рану, если Действием совершит успешную проверку Мудрости (Медицина) со Сл 12. Эта рана также закрывается, если цель получит магическое лечение.",
  5, 2, 4, -1, 2, 0, // характеристики
  ".bearded-devil"
).render();

new HornedDevil(
  "Рогатый Дьявол", 
  "<b>Сопротивление</b> к урону холод; дробящий, колющий и рубящий урон от немагических атак, а также от немагического оружия, которое при этом не посеребрено</br><b>Иммунитет</b> к урону огонь, яд</br><b>Иммунитет</b> к состояниям отравление</br>Чувства тёмное зрение 120 фт., пассивная Внимательность 13</br><b>Языки</b> Инфернальный, телепатия 120 фт.Дьявольское зрение.</br>Магическая тьма не мешает тёмному зрению дьявола.</br><b>Сопротивление магии</b>.Рогатый дьявол совершает с преимуществом спасброски от заклинаний и прочих магических эффектов.</br><b>Мультиатака</b>.Дьявол совершает три рукопашные атаки: две Вилами и одну Хвостом. Он может использовать Метание пламени вместо любой рукопашной атаки.</br><b>Вилы</b>.Рукопашная атака оружием: +10 к попаданию, досягаемость 10 фт., одна цель. Попадание: 15 (2к8 + 6) колющего урона.</br><b>Хвост</b>.Рукопашная атака оружием: +10 к попаданию, досягаемость 10 фт., одна цель. Попадание: 10 (1к8 + 6) колющего урона. Если цель — существо, не являющееся ни нежитью, ни конструктом, она должна преуспеть в <b>спасброске Телосложения со Сл 17</b>, иначе будет терять 10 (3к6) хитов в начале каждого своего хода из-за инфернальной раны.Каждый раз, когда демон попадает этой атакой по цели, уже имеющей эту рану, урон от раны увеличивается на 10 (3к6). Любое существо может залечить рану, если Действием совершит успешную проверку Мудрости (Медицина) со Сл 12. Эта рана также закрывается, если цель получит магическое лечение.</br><b>Метание пламени</b>.Дальнобойная атака заклинанием: +7 к попаданию, дистанция 150 фт., одна цель. Попадание: 14 (4к6) урона огнём. Если цель — горючий предмет, который никто не несёт и не носит, она также загорается.",
  10, 7, 5, 1, 7, 7,
  ".horned-devil"
).render();

new BoneDevil(
  "Костяной Дьявол",
  "<b>Сопротивление</b> к урону холод; дробящий, колющий и рубящий урон от немагических атак, а также от немагического оружия, которое при этом не посеребрено</br><b>Иммунитет</b> к урону огонь, яд, отравление</br>Чувства тёмное зрение 120 фт., пассивная Внимательность 12</br><b>Языки</b> Инфернальный, телепатия 120 фт.</br><b>Дьявольское зрение</b>.Магическая тьма не мешает тёмному зрению дьявола.</br><b>Сопротивление магии</b>.Костяной дьявол совершает с преимуществом спасброски от заклинаний и прочих магических эффектов.</br><b>Мультиатака</b>.Дьявол совершает три атаки: две когтями, и одну жалом.</br><b>Коготь</b>.Рукопашная атака оружием: +8 к попаданию, досягаемость 10 фт., одна цель. Попадание: 8 (1к8 + 4) рубящего урона.</br><b>Жало</b>.Рукопашная атака оружием: +8 к попаданию, досягаемость 10 фт., одна цель. Попадание: 13 (2к8 + 4) колющего урона плюс 17 (5к6) урона ядом, и цель должна преуспеть в спасброске Телосложения со Сл 14, иначе станет отравленной на 1 минуту. Цель может повторять этот спасбросок в конце каждого своего хода, оканчивая эффект на себе при успехе.", 
  4, 3, 4, 5, 6, 7,
  ".bone-devil"
).render();