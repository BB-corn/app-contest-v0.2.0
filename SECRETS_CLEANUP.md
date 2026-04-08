# 仓库密钥/机密清理指南

目的：从 Git 仓库历史中彻底移除已提交的敏感文件（如 `.env`）并指导如何安全地轮换受影响的服务密钥。

重要说明（请先阅读）
- 历史重写会改变仓库提交历史并需要强推（force push）。所有协作者需要重新克隆或运行同步步骤。
- 操作前请先备份：`git clone --mirror <repo> repo-backup.git`。

推荐工作流（两种工具可选）

1) 使用 BFG Repo-Cleaner（简单、快速）

  要求：Java（JRE）已安装

  步骤：

  ```bash
  # 1. 备份仓库
  git clone --mirror git@github.com:your/repo.git repo-backup.git

  # 2. 使用 BFG 删除历史中的 .env 文件（会删除所有提交中名为 .env 的文件）
  # 下载 BFG jar: https://rtyley.github.io/bfg-repo-cleaner/
  java -jar bfg-X.Y.Z.jar --delete-files .env repo-backup.git

  # 3. 清理并压缩本地仓库
  cd repo-backup.git
  git reflog expire --expire=now --all
  git gc --prune=now --aggressive

  # 4. 推送到远端（强制）
  git push --force
  ```

2) 使用 `git filter-repo`（推荐、灵活且官方推荐）

  要求：Python3 + git-filter-repo 已安装（如通过 pip 安装 `pip install git-filter-repo`）

  步骤：

  ```bash
  git clone --mirror git@github.com:your/repo.git
  cd repo.git
  # 删除 .env 路径
  git filter-repo --invert-paths --paths .env

  # 清理并推送
  git reflog expire --expire=now --all
  git gc --prune=now --aggressive
  git push --force
  ```

验证
- 在清理后的仓库中搜索敏感关键字，确认不再存在：
  ```bash
  git grep -n "EXPO_PUBLIC_AMAP_WEB_KEY" || true
  ```

轮换受影响密钥（必须）
- 登录相关服务控制台（如高德地图），撤销/删除被泄露的 key，生成新 key 并记录使用范围（域名/IP 限制、用途限制）。
- 在 CI/部署环境或秘密管理系统（如 GitHub Secrets、Azure Key Vault、AWS Secrets Manager）中更新新的 key。不要在仓库明文保存。

通知团队
- 通知所有协作者仓库已被重写，告知他们重新克隆：

  ```bash
  # 推荐工作方式：先备份未合并的更改
  git clone git@github.com:your/repo.git
  ```

降级/回退计划
- 在推送前确保已保留 `repo-backup.git` 的镜像，以便在出现问题时回滚。

补充脚本（示例）
- 仓库中也提供了 `scripts/purge-env-history.sh`（bash）和 `scripts/purge-env-history.ps1`（PowerShell）作为参考脚本，运行前请阅读并替换 `origin`/`repo` 地址与路径。

如果你需要，我可以：
- 生成并提交一份包含你远端仓库地址的可执行脚本（我也可以把脚本设计为交互式、先做 dry-run）。
- 帮你把该操作自动化为 GitHub Actions（注意：历史重写通常需要在受控环境本地执行，而不是 CI）。

安全建议总结：
- 立即撤销/轮换被泄露的 key。  
- 从历史中彻底删除敏感文件并强推。  
- 将所有生产凭据迁移到受管理的秘密存储并通过环境注入。  
