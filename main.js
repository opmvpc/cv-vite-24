// Importer le CSS
import './style.css';
import '@fortawesome/fontawesome-free/css/all.css'; // Ajout pour les icônes Font Awesome

// Import du JSON contenant les données du CV
import cvData from './cv_data.json';

// Fonction pour générer et insérer le contenu du CV dans le DOM
function generateCV(cv) {
  // Sélection du body ou d'un élément parent
  const app = document.getElementById('app');

  // Création d'un conteneur principal
  const container = document.createElement('div');
  container.classList.add('cv-container');

  // Ajout de la section d'en-tête (photo, nom, contacts)
  const header = document.createElement('div');
  header.classList.add('cv-header');
  header.innerHTML = `
        <img src="/photo.jpg" alt="Photo de profil">
        <h1>${cv.personal_info.name}</h1>
        <p><strong>Localisation:</strong> ${cv.personal_info.location}</p>
    `;

  // Ajout des icônes de contact (GitHub, email, site web)
  const contactIcons = `
        <div class="contact-icons">
            <a href="${cv.personal_info.contact.github}" target="_blank"><i class="fab fa-github"></i></a>
            <a href="mailto:${cv.personal_info.contact.email}"><i class="fas fa-envelope"></i></a>
            <a href="${cv.personal_info.contact.website}" target="_blank"><i class="fas fa-globe"></i></a>
        </div>
    `;
  header.insertAdjacentHTML('beforeend', contactIcons);
  container.appendChild(header);

  // Section Expériences
  const experienceSection = document.createElement('div');
  experienceSection.classList.add('experience-section');
  const experienceTitle = document.createElement('h3');
  experienceTitle.innerHTML = `<i class="fas fa-briefcase"></i> Expériences professionnelles`;
  experienceSection.appendChild(experienceTitle);

  cv.experience.forEach(exp => {
    const expDiv = document.createElement('div');
    expDiv.classList.add('experience');
    expDiv.innerHTML = `
            <h4><i class="fas fa-chevron-right"></i> ${exp.position} (${exp.dates})</h4>
            <p><strong>Entreprise:</strong> ${exp.company}</p>
            <ul>
                ${exp.tasks.map(task => `<li><i class="fas fa-check-circle"></i> ${task}</li>`).join('')}
            </ul>
        `;
    experienceSection.appendChild(expDiv);
  });
  container.appendChild(experienceSection);

  // Section Compétences
  const skillsSection = document.createElement('div');
  skillsSection.classList.add('skills-section');
  const skillsTitle = document.createElement('h3');
  skillsTitle.innerHTML = `<i class="fas fa-tools"></i> Compétences`;
  skillsSection.appendChild(skillsTitle);

  const skillList = document.createElement('ul');
  Object.keys(cv.skills).forEach(skillCategory => {
    const skillData = cv.skills[skillCategory];

    // Vérifier si c'est un objet ou un tableau
    let skills;
    if (Array.isArray(skillData)) {
      skills = skillData.join(', ');
    } else if (typeof skillData === 'object') {
      // Si c'est un objet, créer une chaîne de sous-compétences
      skills = Object.keys(skillData).map(subSkill => `${subSkill}: ${skillData[subSkill].join(', ')}`).join(' | ');
    } else {
      skills = skillData;
    }

    const category = document.createElement('li');
    category.innerHTML = `<i class="fas fa-chevron-right"></i> <strong>${skillCategory}:</strong> ${skills}`;
    skillList.appendChild(category);
  });
  skillsSection.appendChild(skillList);
  container.appendChild(skillsSection);

  // Section Formation
  const educationSection = document.createElement('div');
  educationSection.classList.add('education-section');
  const educationTitle = document.createElement('h3');
  educationTitle.innerHTML = `<i class="fas fa-graduation-cap"></i> Formation`;
  educationSection.appendChild(educationTitle);

  cv.education.forEach(edu => {
    const eduDiv = document.createElement('div');
    eduDiv.classList.add('education');
    eduDiv.innerHTML = `
            <h4><i class="fas fa-chevron-right"></i> ${edu.degree} (${edu.dates})</h4>
            <p>${edu.institution}</p>
        `;
    educationSection.appendChild(eduDiv);
  });
  container.appendChild(educationSection);

  // Section Intérêts
  const interestsSection = document.createElement('div');
  interestsSection.classList.add('interests-section');
  const interestsTitle = document.createElement('h3');
  interestsTitle.innerHTML = `<i class="fas fa-heart"></i> Intérêts`;
  interestsSection.appendChild(interestsTitle);

  const interestList = document.createElement('ul');
  cv.interests.forEach(interest => {
    const li = document.createElement('li');
    li.innerHTML = `<i class="fas fa-chevron-right"></i> ${interest}`;
    interestList.appendChild(li);
  });
  interestsSection.appendChild(interestList);
  container.appendChild(interestsSection);

  // Ajout de tout le contenu au DOM
  app.appendChild(container);
}

// Appel de la fonction pour générer le CV
generateCV(cvData);
