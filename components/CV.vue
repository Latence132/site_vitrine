<template lang="pug">
v-flex.black--text
  // First banner
  v-layout(id="cvUpperBanner" xs12 wrap  align-end)
    v-flex.pa-0.ma-0(xs4 style="height : 150px;" )
      img(src='\photo_cv_petit.png' alt="alexandre_chaumer_photo" style="height: 150px;	width: auto;")
    v-flex(xs8 style="height : 100px;" )
      h2 Alexandre Chaumet
      h3 Développeur web

  v-layout.pa-0.ma-0(wrap)
    v-flex.pa-0.ma-0(xs4)
      h4
        img(src='competences_transparent.png' alt="competences")
        |Compétences
      v-layout( wrap v-for="(competence, index) in competences" :key="index+'_competence'")
        v-flex(xs12)
          h5 {{ competence.titre }}
        v-flex(xs12 v-for="(item, index) in competence.list" :key="index+'travail'" ) {{ item }}
      h4
        img(src='langues.png' alt="langues")
        | Langues
      v-flex {{langue.nom}} {{langue.niv}}

      v-flex  {{contact.email}} <br/> {{contact.tel}} <br/> {{contact.adresse}}
      h4(style=("color: none")) Contact
        img(src='contact_transparent.png' alt="contact")
      v-flex  {{contact.email}} <br/> {{contact.tel}} <br/> {{contact.adresse}}

    v-flex.pa-0.ma-0(xs8)
      h4
        img(src='experiences.png' alt="experiences")
        | Expériences professionnelles
      v-layout( wrap v-for="(expPro, index) in expPros" :key="index")
        v-flex.expDate(xs2) {{ expPro.date }}
          img(:src='expPro.logo' alt="logo_entreprise" style="height: 50px; width: auto;")
        v-flex(xs10)
          v-layout(wrap)
            v-flex(xs12 )
              strong {{ expPro.job }}
            v-flex(xs12) {{ expPro.entreprise }}, {{expPro.lieu}}
            v-flex(xs12) {{ expPro.travail }}
      h4
        img(src='formation.png' alt="formation")
        |Formations
      v-layout( wrap v-for="(formation, index) in formations" :key="index")
        v-flex(xs2) {{ formation.date }}
          img(:src='formation.logo' alt="logo_formation" style="height: 50px; width: auto;")
        v-flex(xs10)
          v-layout(wrap)
            v-flex(xs12) #[strong {{ formation.nom }}]  - {{ formation.region }}
            v-flex(xs12) {{ formation.titre }}

</template>

<script>
export default {
  data() {
    return {
      expPros: [
        { date:'Mai 2018', logo:'akeros.png', lieu:'Mérignac (33)', job: 'Développeur Front-end Nuxt/VueJS', entreprise: 'Akeros', travail: 'Développement d\'une page de supervision de drones et de pages permettants de commander un robot'},
        { date:'2016', logo:'alten.png', lieu:'La défense (92)', job: 'Ingénieur solution SCADA', entreprise: 'Alten SIR - Air Liquide Service', travail: 'Installation, maintenance et evolution de solution applicatives d\'acquisition et d\'historisation de données'},
        { date:'2014', logo:'alten.png', lieu:'Arceuil (94)', job: 'Contrôleur de base de données', entreprise: 'Alten SIR - Orange', travail: 'Fiabilisation et migration du parc commercial depuis l\'ancien CRM de Wanadoo sur le nouveau d\'Orange'},
        { date:'2013', logo:'solutec.png', lieu:'Massy (92)', job: 'Analyste de base données', entreprise: 'Solutec - Carrefour', travail: 'Réalisation d\'études et d\'extractions ad hoc en SQL'},
        { date:'2009', logo:'faurecia.jpg', lieu:'Caligny (61)', job: 'Apprenti qualiticien produit/process', entreprise: 'Faurecia', travail: 'Développement de macros VBA permettant de piloter informatiquement des indicateurs de non-qualités'},
      ],
      formations: [
        { date:'2018', logo:'ifpa.png', nom: 'Titre professionnel délivré par IFPA', region: 'Mérignac (33)', titre: 'Développeur logiciel'},
        { date:'2017', logo:'OC.png', nom: 'Openclassrooms', region: 'domicile', titre: 'Développeur web (5 certificats)'},
        { date:'2012', logo:'ensam.png', nom: 'Arts et Métiers ParisTech (ENSAM)', region: 'Paris (75)', titre: 'Diplôme d\'Ingénieur des Arts & Métiers ParisTech en Alternance en Génie Industriel'},
        { date:'2007', logo:'iut.jpg', nom: 'DUT GEII', region: 'Vélizy (78)', titre: 'Génie Electrique et Informatique Industrielle'},
      ],
      competences:[
        { titre: 'Developper une application client-serveur',  list: ['Maquetter une application', 'Concevoir une base de données', 'Mettre en place une base de données', 'Développer une interface utilisateur', 'Développer des composants d\'accès aux données']},
        { titre: 'Développer une application web',  list: ['Développer des pages web en lien avec une base de données', 'Mettre en oeuvre une solution de gestion de contenu ou e-commerce', 'Développer une application simple de mobilité numérique']},
        { titre: 'Langages',  list: ['HTML, CSS, JavaScript, PHP, SQL' ]},
        { titre: 'Outils de développement',  list: ['Bootstrap4, Semantic-UI, Vuetify', 'Nuxt, VueJS, NodeJS, JQuery', 'Symfony 3, Webpack, Git' ]}
      ],
      langue: { nom:'Anglais', niv:'courant'},
      contact: { email:'alexandre.chaumet@adz.org', tel:' 06 06 98 57 51', adresse: '14 rue des fleurs (33320) Eysines'}
    }
  }
}
</script>

<style lang="stylus" scoped>
//div
//  border: 1px solid red

div >>> #cvUpperBanner
  height: 150px

h4, h5, img
  display: inline-block

h4

div >>> .expDate
  padding:0 !important
  margin:0 !important


</style>
