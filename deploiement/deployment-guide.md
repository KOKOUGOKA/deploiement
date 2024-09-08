# Guide de déploiement pour l'application ADMINISTRATION SCOLAIRE

Ce guide explique comment déployer l'application ADMINISTRATION SCOLAIRE, comprenant un backend Node.js/Express et un frontend React.

## I. Déploiement du Backend

1. Préparation du backend pour le déploiement :

   a. Assurez-vous que toutes les variables d'environnement sont configurées dans un fichier `.env` :
   ```
   PORT=3000
   MONGODB_URI=mongodb+srv://your-mongodb-uri
   JWT_SECRET=your-secret-key
   ```

   b. Mettez à jour le script de démarrage dans `package.json` :
   ```json
   "scripts": {
     "start": "node app.js"
   }
   ```

2. Choisissez une plateforme de déploiement (par exemple, Heroku) :

   a. Créez un compte sur Heroku et installez l'Heroku CLI.
   
   b. Initialisez un repo Git si ce n'est pas déjà fait :
   ```
   git init
   git add .
   git commit -m "Initial commit"
   ```
   
   c. Créez une nouvelle application Heroku :
   ```
   heroku create nom-de-votre-app
   ```
   
   d. Configurez les variables d'environnement sur Heroku :
   ```
   heroku config:set MONGODB_URI=mongodb+srv://your-mongodb-uri
   heroku config:set JWT_SECRET=your-secret-key
   ```
   
   e. Déployez l'application :
   ```
   git push heroku main
   ```

3. Configurez la base de données MongoDB :

   a. Créez un compte sur MongoDB Atlas si vous n'en avez pas déjà un.
   
   b. Créez un nouveau cluster et obtenez l'URI de connexion.
   
   c. Assurez-vous que l'URI de connexion est correctement configuré dans les variables d'environnement.

## II. Déploiement du Frontend

1. Préparation du frontend pour le déploiement :

   a. Mettez à jour l'URL de l'API dans le frontend pour pointer vers l'URL de production du backend :
   ```javascript
   const API_URL = 'https://nom-de-votre-app.herokuapp.com/api';
   ```

   b. Construisez l'application React :
   ```
   npm run build
   ```

2. Déployez le frontend sur Netlify :

   a. Créez un compte sur Netlify si vous n'en avez pas déjà un.
   
   b. Installez l'outil CLI de Netlify :
   ```
   npm install netlify-cli -g
   ```
   
   c. Déployez l'application :
   ```
   netlify deploy
   ```
   
   d. Suivez les instructions pour lier votre projet à un site Netlify.
   
   e. Quand vous êtes prêt pour la production, utilisez :
   ```
   netlify deploy --prod
   ```

## III. Configuration CORS

Assurez-vous que le backend autorise les requêtes CORS depuis l'URL de votre frontend déployé :

```javascript
app.use(cors({
  origin: 'https://your-frontend-url.netlify.app'
}));
```

## IV. Tests post-déploiement

1. Testez toutes les fonctionnalités principales de l'application dans l'environnement de production.
2. Vérifiez que l'authentification fonctionne correctement.
3. Assurez-vous que toutes les opérations CRUD sur les cours, les étudiants, etc. fonctionnent comme prévu.

## V. Surveillance et maintenance

1. Mettez en place des outils de surveillance comme New Relic ou Sentry pour suivre les performances et les erreurs.
2. Configurez des alertes pour être notifié en cas de problèmes.
3. Planifiez des mises à jour régulières de sécurité et de dépendances.

En suivant ce guide, vous devriez être en mesure de déployer avec succès l'application ADMINISTRATION SCOLAIRE. N'oubliez pas de tester rigoureusement après chaque déploiement pour vous assurer que tout fonctionne comme prévu dans l'environnement de production.
