# Guide de Débogage - Authentification Decap CMS

## ✅ Modifications Effectuées

### 1. Configuration Decap CMS (`public/admin/config.yml`)
- **AVANT** : `name: git-gateway` (système obsolète)  
- **APRÈS** : `name: github` (système recommandé 2024)

### 2. Correction Netlify Function (`netlify/functions/auth-callback.js`)
- Correction de la syntaxe de template string dans postMessage

## 🔍 Vérifications à Effectuer sur Netlify

### Variables d'Environnement
Vérifiez que ces variables sont bien définies dans **Site settings > Environment variables** :

```
GITHUB_CLIENT_ID=votre_client_id
GITHUB_CLIENT_SECRET=votre_client_secret
```

### Configuration GitHub OAuth App
Dans votre **GitHub OAuth Application**, vérifiez :

1. **Homepage URL** : `https://cbsn.netlify.app`
2. **Authorization callback URL** : `https://cbsn.netlify.app/.netlify/functions/auth-callback`

## 🧪 Test de l'Authentification

### Étapes de Test :
1. Aller sur `https://cbsn.netlify.app/admin`
2. Cliquer sur "Login with GitHub"
3. ✅ **Attendu** : Redirection vers GitHub pour authentification
4. ✅ **Attendu** : Retour au CMS avec accès complet

### En cas de Problème :
- Vérifier les **Deploy logs** sur Netlify
- Vérifier les **Functions logs** dans l'onglet Functions
- Tester en navigation privée pour éviter les caches

## 🔧 Commandes de Redéploiement

```bash
# Si vous devez forcer un redéploiement
pnpm build
# Puis push sur GitHub pour déclencher le rebuild Netlify
```

## 📋 Checklist Finale

- [ ] Variables d'environnement GitHub configurées sur Netlify
- [ ] GitHub OAuth App configurée avec les bonnes URLs
- [ ] Configuration Decap CMS mise à jour (`github` au lieu de `git-gateway`)
- [ ] Site redéployé après les modifications
- [ ] Test d'authentification réussi sur `/admin`

## 🆘 En cas d'Échec

Si le problème persiste :
1. Vérifier les logs de la fonction auth-callback
2. Contrôler que le repository GitHub existe et est accessible
3. S'assurer que l'utilisateur a les permissions d'écriture sur le repository