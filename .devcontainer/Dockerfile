# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/devcontainers/javascript-node:1-20-bullseye

RUN wget https://github.com/mikefarah/yq/releases/latest/download/yq_linux_amd64 -O /usr/local/bin/yq && chmod +x /usr/local/bin/yq
RUN type -p curl >/dev/null || (apt-get update && sudo apt-get install curl -y) \
    && curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
    && chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
    && apt-get update \
    && apt-get install gh -y \
    && rm -rf /var/lib/apt/lists/*

RUN echo $'\
    [alias]\n\
    a = commit --amend --no-edit\n\
    br = branch\n\
    ci = commit\n\
    d = diff\n\
    dt = difftool\n\
    ria = rebase -i --autosquash\n\
    riam = rebase -i --autosquash origin/main\n\
    s = status' > ~/.gitconfig
