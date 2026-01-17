# 🌳 Git Branching Strategy - Finsight

**Project:** Finsight Web Application  
**Developer:** Prasanth Pulipakala  
**Repository:** https://github.com/prasanth-techbite/finsight-web  
**Last Updated:** January 17, 2026

---

## 📋 Current Strategy

### Phase 1: MVP Development (Weeks 1-2)
**Status:** Active  
**Branch Model:** Simple Main Branch

```
main (production)
  └── Direct commits
```

**Reason:** Solo developer, MVP stage, need speed

---

## 🎯 Branching Strategy by Phase

### Phase 1: Modules 1-3 (Week 1) - CURRENT

**Branch Structure:**
```
main
```

**Workflow:**
```bash
# Work directly on main
git add .
git commit -m "descriptive message"
git push

# Auto-deploys to: finsight-web-pi.vercel.app
```

**When to Use:**
- ✅ Module 1: Foundation (Complete)
- ✅ Module 2: Authentication (Today)
- ✅ Module 3: Market Data (Days 3-5)

**Pros:**
- Fast iteration
- Immediate live deployment
- Simple workflow
- Less context switching

**Cons:**
- No testing environment
- Main is always changing
- Can't preview features

---

### Phase 2: Modules 4-7 (Week 2)

**Branch Structure:**
```
main (production - stable)
  └── dev (development - testing)
```

**Workflow:**
```bash
# Create dev branch (one time)
git checkout -b dev
git push -u origin dev

# Daily work on dev
git add .
git commit -m "feature: add stock charts"
git push origin dev

# Test on dev deployment: finsight-web-dev.vercel.app

# When ready for production (end of module)
git checkout main
git merge dev
git push origin main

# Goes live: finsight-web-pi.vercel.app
```

**When to Use:**
- Module 4: Stock Search & Details
- Module 5: Interactive Charts
- Module 6: Watchlist Management
- Module 7: Portfolio Tracking

**Pros:**
- Separate testing environment
- Main stays stable
- Can preview before going live
- Easy rollback

**Cons:**
- Extra step (merge to main)
- Need to remember which branch you're on

---

### Phase 3: Modules 8-9 & Beyond (Weeks 3-4)

**Branch Structure:**
```
main (production)
  └── dev (staging)
       ├── feature/stock-screener
       ├── feature/market-calendar
       ├── feature/alerts
       └── bugfix/chart-loading
```

**Workflow:**
```bash
# Create feature branch from dev
git checkout dev
git checkout -b feature/stock-screener

# Work on feature
git add .
git commit -m "add stock screener filters"
git push origin feature/stock-screener

# When feature complete
git checkout dev
git merge feature/stock-screener
git push origin dev

# Test on dev deployment

# When ready for production
git checkout main
git merge dev
git push origin main

# Delete feature branch (cleanup)
git branch -d feature/stock-screener
git push origin --delete feature/stock-screener
```

**When to Use:**
- Module 8: Advanced Features
- Module 9: Optimization & Polish
- Post-MVP enhancements
- Bug fixes
- Multiple features in parallel

**Pros:**
- Organized feature development
- Multiple features can be worked on
- Easy to abandon incomplete features
- Clean git history

**Cons:**
- More complex
- More branches to manage
- Need discipline

---

## 📊 Branch Naming Conventions

### Main Branches
```
main        - Production (always stable, always deployable)
dev         - Development (testing ground, merge here first)
staging     - Optional: Pre-production testing
```

### Feature Branches
```
feature/[feature-name]
  Examples:
  - feature/google-oauth
  - feature/stock-charts
  - feature/portfolio-tracking
  - feature/price-alerts
```

### Bugfix Branches
```
bugfix/[bug-description]
  Examples:
  - bugfix/chart-loading
  - bugfix/login-error
  - bugfix/mobile-responsive
```

### Hotfix Branches
```
hotfix/[critical-issue]
  Examples:
  - hotfix/security-patch
  - hotfix/api-crash
  
  (Goes directly to main if urgent)
```

---

## 🎯 Commit Message Convention

### Format
```
type: brief description

Detailed explanation (optional)
```

### Types
```
feat:     New feature
fix:      Bug fix
docs:     Documentation changes
style:    Formatting, no code change
refactor: Code restructuring
test:     Adding tests
chore:    Maintenance tasks
```

### Examples
```bash
# Good commits
git commit -m "feat: add Google OAuth login"
git commit -m "fix: resolve chart loading issue on mobile"
git commit -m "docs: update README with API endpoints"
git commit -m "refactor: optimize portfolio calculation logic"

# Bad commits
git commit -m "update"
git commit -m "changes"
git commit -m "fix bug"
```

---

## 🔄 Common Workflows

### Daily Development (Phase 1 - Current)
```bash
# Start work
cd /d/Finsight/finsight-web

# Make changes in VS Code

# Check what changed
git status

# Stage all changes
git add .

# Commit with message
git commit -m "feat: add user authentication"

# Push to GitHub (auto-deploys)
git push
```

---

### Daily Development (Phase 2 - With Dev Branch)
```bash
# Make sure you're on dev branch
git checkout dev

# Make changes in VS Code

# Stage and commit
git add .
git commit -m "feat: add stock detail page"
git push origin dev

# Test on dev URL

# When ready for production
git checkout main
git merge dev
git push origin main
```

---

### Feature Development (Phase 3)
```bash
# Start new feature
git checkout dev
git checkout -b feature/stock-screener

# Work on feature
# ... code ...
git add .
git commit -m "feat: add screener filters"
git push origin feature/stock-screener

# Continue working
# ... more code ...
git add .
git commit -m "feat: add screener results table"
git push origin feature/stock-screener

# Feature complete - merge to dev
git checkout dev
git merge feature/stock-screener
git push origin dev

# Test on dev

# Ready for production
git checkout main
git merge dev
git push origin main

# Cleanup
git branch -d feature/stock-screener
git push origin --delete feature/stock-screener
```

---

## 🚨 Emergency Hotfix Workflow

```bash
# Critical bug in production!

# Create hotfix from main
git checkout main
git checkout -b hotfix/critical-api-bug

# Fix the bug
# ... code ...
git add .
git commit -m "hotfix: resolve API authentication issue"

# Test locally

# Merge directly to main (urgent!)
git checkout main
git merge hotfix/critical-api-bug
git push origin main

# Also merge to dev (keep in sync)
git checkout dev
git merge hotfix/critical-api-bug
git push origin dev

# Cleanup
git branch -d hotfix/critical-api-bug
```

---

## 📅 Implementation Timeline

### Week 1 (Jan 17-23)
```
✅ Module 1: Foundation (Complete)
🔄 Module 2: Auth (Today)
📋 Module 3: Market Data

Strategy: Push directly to main
Branch: main only
```

### Week 2 (Jan 24-30)
```
📋 Module 4: Stock Details
📋 Module 5: Charts
📋 Module 6: Watchlist
📋 Module 7: Portfolio

Strategy: Introduce dev branch
Branches: main + dev
```

### Week 3-4 (Jan 31 - Feb 6)
```
📋 Module 8: Advanced Features
📋 Module 9: Polish

Strategy: Feature branches
Branches: main + dev + feature/*
```

---

## 🛠️ Useful Git Commands

### Branch Management
```bash
# List all branches
git branch -a

# Create new branch
git checkout -b branch-name

# Switch branch
git checkout branch-name

# Delete local branch
git branch -d branch-name

# Delete remote branch
git push origin --delete branch-name

# Rename branch
git branch -m old-name new-name
```

### Viewing History
```bash
# View commit history
git log --oneline

# View branch structure
git log --oneline --graph --all

# View changes
git diff

# View changes in specific file
git diff filename
```

### Undoing Changes
```bash
# Discard local changes
git restore filename

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Revert a commit (create new commit)
git revert commit-hash
```

### Syncing
```bash
# Get latest from remote
git fetch

# Pull latest changes
git pull

# Pull specific branch
git pull origin branch-name

# Push to specific branch
git push origin branch-name
```

---

## 🎯 Best Practices

### Do's ✅
- Write clear, descriptive commit messages
- Commit often (small, logical chunks)
- Pull before you push
- Test before merging to main
- Delete branches after merging
- Keep main always deployable
- Use meaningful branch names

### Don'ts ❌
- Don't commit directly to main in Phase 2+
- Don't commit node_modules (in .gitignore)
- Don't commit .env files (in .gitignore)
- Don't use vague commit messages
- Don't push broken code to main
- Don't leave stale branches around
- Don't force push (unless you know what you're doing)

---

## 🔍 Troubleshooting

### "I'm on the wrong branch!"
```bash
# Save your changes
git stash

# Switch to correct branch
git checkout correct-branch

# Restore your changes
git stash pop
```

### "I committed to main but meant to commit to dev!"
```bash
# On main branch
git reset --soft HEAD~1

# Switch to dev
git checkout dev

# Commit again
git commit -m "your message"
git push origin dev
```

### "Merge conflict!"
```bash
# Open conflicted files in VS Code
# Look for <<<<<<< and >>>>>>>
# Choose which changes to keep
# Save the file

# Mark as resolved
git add filename

# Continue merge
git commit
```

### "I want to undo my last push!"
```bash
# Revert (creates new commit - safe)
git revert HEAD
git push

# OR reset (rewrites history - dangerous!)
git reset --hard HEAD~1
git push --force  # Only if you're sure!
```

---

## 📊 Branch Protection Rules (Future)

When you want extra safety (Week 3+):

**On GitHub:**
1. Go to Settings → Branches
2. Add rule for `main` branch:
   - ✅ Require pull request reviews
   - ✅ Require status checks to pass
   - ✅ No force pushes
   - ✅ No deletions

**Benefits:**
- Can't accidentally push broken code to main
- Forces review process
- Safer production branch

---

## 📝 Quick Reference Card

```bash
# PHASE 1 (Week 1) - Current
git add .
git commit -m "message"
git push

# PHASE 2 (Week 2) - With Dev
git checkout dev
git add .
git commit -m "message"
git push origin dev
# When ready:
git checkout main
git merge dev
git push

# PHASE 3 (Week 3+) - Feature Branches
git checkout -b feature/name
git add .
git commit -m "message"
git push origin feature/name
# When ready:
git checkout dev
git merge feature/name
git push origin dev
```

---

## 🎓 Learning Resources

- **Git Basics:** https://git-scm.com/book/en/v2
- **GitHub Flow:** https://guides.github.com/introduction/flow/
- **Git Branching:** https://learngitbranching.js.org/
- **Commit Messages:** https://www.conventionalcommits.org/

---

## 📞 When to Ask for Help

Ask in chat if:
- 🤔 Confused about which branch to use
- 🔄 Need help with merge conflicts
- ❌ Made a mistake and need to undo
- 🎯 Want to try a new branching strategy
- 📚 Want to learn advanced Git features

---

## ✅ Checklist: Transitioning to Dev Branch

When moving from Phase 1 → Phase 2 (Week 2):

**One-time setup:**
```bash
# 1. Make sure main is up to date
git checkout main
git pull

# 2. Create dev branch from main
git checkout -b dev

# 3. Push dev to GitHub
git push -u origin dev

# 4. Set up Vercel to deploy dev branch
# (Go to Vercel dashboard → Settings → Git)

# 5. Done! Now work on dev branch
```

**Daily workflow changes:**
```bash
# OLD (Phase 1):
git add .
git commit -m "message"
git push

# NEW (Phase 2):
git checkout dev  # Make sure on dev!
git add .
git commit -m "message"
git push origin dev
```

---

**Last Updated:** January 17, 2026  
**Review:** After completing each phase  
**Owner:** Prasanth Pulipakala

---

**Remember: Start simple, add complexity as needed!** 🚀