<template lang="pug">
v-flex.black--text(id="cvWrapper")
  // First banner
  v-parallax(id="parallax" src="/mer_ecran1.jp2" height="110" width="100%")
    v-layout(id="cvUpperBanner" xs12 wrap align-center )
      v-flex.ml-0.text-xs-center(xs4)
        img.mt-2.pt-2(src='\photo_cv_petit.jp2' alt="alexandre_chaumet_photo" style="height: 100px;	width: auto;")
      v-flex.mr-0.text-xs-center(xs8 style="font-size: 1.2rem")
        h2.my-auto Alexandre Chaumet
        h3.my-auto Développeur web

  v-layout(wrap)
    v-flex.text-xs-center(xs12 sm4 id="cvLeft")

      // Compétences
      v-flex.elevation-6(id="cvCompetences")
        h4
          v-layout(wrap row )
            v-flex
              img(src='competences_transparent.png' alt="competences")
            v-flex.mt-1.headline Compétences
        v-layout( wrap v-for="(competence, index) in competences" :key="index+'_competence'")
          v-flex(xs12)
            h5.title {{ competence.titre }}
          v-flex.text-xs-left(xs12 v-for="(item, index) in competence.list" :key="index+'travail'" ) {{ item }}

        //Langues
        h4
          v-layout(wrap row )
            v-flex
              img(src='langues.png' alt="langues")
            v-flex.mt-1.headline Langues
        v-flex.text-xs-left {{langue.nom}} {{langue.niv}}

      //Contact
      v-flex.elevation-10.mt-2(id="cvContact" )
        h4
          img(src='contact_transparent.png' alt="contact")
        v-flex
          strong(style="font-size: 1.2rem") {{contact.email}}
        v-flex site perso :
          nuxt-link(to="/") https://latdat2.org
        v-flex {{contact.tel}} <br/> {{contact.adresse}}

    v-flex.elevation-6.text-xs-center(xs12 sm8 id="cvRight")

      //Expériences professionnelles
      v-flex(id="cvExps")
        h4
          v-layout(wrap row )
            v-flex
              img(src='experiences.png' alt="experiences")
            v-flex.mt-1.headline Expériences professionnelles
        v-layout( wrap v-for="(expPro, index) in expPros" :key="index")
          v-flex.text-xs-left.expDate(xs2) {{ expPro.date }}
            img(:src='expPro.logo' alt="logo_entreprise" style="height: 50px; width: auto;")
            | {{ expPro.temps }}
          v-flex.text-xs-left(xs10)
            v-layout(wrap)
              v-flex(xs12 )
                strong.title {{ expPro.job }}
              v-flex.subheading(xs12) {{ expPro.entreprise }}, {{expPro.lieu}}
              v-flex.subheading(xs12) {{ expPro.travail }}

      //Formations
      v-flex.mt-1(id="cvFormations")
        h4
          v-layout(wrap row )
            v-flex
              img(src='formation.png' alt="formation")
            v-flex.mt-2.headline Formations
        v-layout( wrap v-for="(formation, index) in formations" :key="index")
          v-flex.text-xs-left(xs2) {{ formation.date }}
            img(:src='formation.logo' alt="logo_formation" style="height: 50px; width: auto;")
          v-flex.text-xs-left(xs10)
            v-layout(wrap)
              v-flex(xs12) #[strong.title {{ formation.nom }}]  - {{ formation.region }}
              v-flex.subheading(xs12) {{ formation.titre }}

</template>

<script>
export default {
  data() {
    return {
      expPros: [
        { date:'2018', temps:'1,5 mois', logo:'akeros.png', lieu:'Mérignac (33)', job: 'Développeur Front-end Nuxt/VueJS', entreprise: 'Akeros', travail: 'Développement d\'une page de supervision de drones et de pages permettants de commander un robot'},
        { date:'2016', temps:'1,5 an', logo:'alten.png', lieu:'La défense (92)', job: 'Ingénieur solution SCADA', entreprise: 'Alten SIR - Air Liquide Service', travail: 'Installation, maintenance et evolution de solutions applicatives d\'acquisition et d\'historisation de données'},
        { date:'2014', temps:'1,5 an', logo:'alten.png', lieu:'Arceuil (94)', job: 'Contrôleur de base de données', entreprise: 'Alten SIR - Orange', travail: 'Fiabilisation et migration du parc commercial depuis l\'ancien CRM de Wanadoo sur le nouveau d\'Orange'},
        { date:'2013', temps:'1,5 an', logo:'solutec.png', lieu:'Massy (92)', job: 'Analyste de base données', entreprise: 'Solutec - Carrefour', travail: 'Réalisation d\'études et d\'extractions ad hoc en SQL'},
        { date:'2009', temps:'3.0 ans', logo:'faurecia.jpg', lieu:'Caligny (61)', job: 'Apprenti qualiticien produit/process', entreprise: 'Faurecia', travail: 'Développement de macros VBA permettant de piloter informatiquement des indicateurs de non-qualités'},
      ],
      formations: [
        { date:'2018', logo:'ifpa.png', nom: 'Titre professionnel délivré par IFPA', region: 'Mérignac (33)', titre: 'Développeur logiciel'},
        { date:'2017', logo:'OC.png', nom: 'Openclassrooms', region: 'domicile', titre: 'Développeur web (5 certificats)'},
        { date:'2012', logo:'ensam.png', nom: 'Arts et Métiers ParisTech (ENSAM)', region: 'Paris (75)', titre: 'Diplôme d\'Ingénieur des Arts & Métiers ParisTech en Alternance en Génie Industriel'},
        { date:'2007', logo:'iut.jpg', nom: 'DUT GEII', region: 'Vélizy (78)', titre: 'Génie Electrique et Informatique Industrielle'},
      ],
      competences:[
        { titre: 'Développer une application client-serveur',  list: ['Maquetter une application', 'Concevoir une base de données', 'Mettre en place une base de données', 'Développer une interface utilisateur', 'Développer des composants d\'accès aux données']},
        { titre: 'Développer une application web',  list: ['Développer des pages web en lien avec une base de données', 'Mettre en oeuvre une solution de gestion de contenu ou e-commerce', 'Développer une application simple de mobilité numérique']},
        { titre: 'Langages',  list: ['HTML, CSS, JavaScript, PHP, JAVA, SQL' ]},
        { titre: 'Outils de développement',  list: ['Bootstrap4, Semantic-UI, Vuetify', 'Nuxt, VueJS, NodeJS, JQuery', 'Symfony 3, Webpack, Git' ]}
      ],
      langue: { nom:'Anglais', niv:'courant'},
      contact: { email:'alexandre.chaumet@gadz.org', tel:' 06 06 98 57 51', adresse: '14 rue des fleurs (33320) Eysines'}
    }
  }
}
</script>

<style lang="stylus" scoped>
div
  font-family: 'Dosis', sans-serif

h4, h5, img
  display: inline-block

div >>> .expDate
  padding:0 !important
  margin:0 !important

#cvContact, #cvFormations, #cvCompetences, #cvExps, #parallax
  border-radius: 4px
  border: 1px solid black

.subheading
  padding: 0
  margin: 0

//div >>> #cvUpperBanner
//  background-image: url('/banner_linkedin.jpg')
//  background-size: cover
</style>
