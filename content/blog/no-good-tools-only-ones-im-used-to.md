---
title: "no good tools, only ones I'm used to"
description: "I really love setting up my environment. Before using any tool, whether it's a terminal, code editor, or some CLI - I usually spend several hours or even\u2026"
date: 2024-12-02
tags:
  - "tech"
---

I really love setting up my environment. Before using any tool, whether it's a terminal, code editor, or some CLI - I usually spend several hours or even days configuring it to my needs before starting to use it.

For quite a while, I used JetBrains and had no issues. Everything worked generally well, rather slowly, but stable. Then my good friend promoted Neovim to me. I kept putting off trying it for a long time, but eventually downloaded the Lazyvim distribution, spent about a week setting it up and getting used to Vim motions and... God, can an editor work THIS fast? I can't believe it.

Until recently, everything was fine, until I started noticing more and more how poorly everything works in terms of LSP. When I say poorly - I mean very poorly. Constant updates and plugin incompatibilities, terrible performance of some closed-source LSPs (pyright), and constant fine-tuning. I'm tired of dealing with this, honestly.

I decided to try Helix (again, on friend's advice), but several things annoy me about it:

- No plugin support
    - Yes, those same plugin compatibility issues, but this is generally fixable
    - Because of this, there's no way to add something like a file tree. This is an extremely convenient feature that I'm not willing to give up under any circumstances. File search doesn't completely replace this functionality.
- Slightly different keybindings compared to standard vim
    - Since I use vim mode not only in the editor but also in Obsidian, leetcode, and basically everywhere that supports standard vim mode, I don't want to memorize dozens of combinations in different editors.

And ultimately, I realized it's not for me yet, maybe until some time.

I decided to try returning to JetBrains, installing the Vim plugin there. As always - everything works well in terms of code analysis, refactoring, and all other integrations, but it's very slow - using it makes you physically uncomfortable.

Shall we give VS Code a chance? Setting up neovim with Lazyvim distribution (it has built-in support for VS Code). Everything works generally well, but there are issues:

- Whenever a plugin updates in neovim - there's a high chance something will break inside VS Code. Very annoying at times.
- Some neovim features work poorly with VS Code's built-in features
    - bufferline <-> VS Code tabs (keybindings for tabs barely work, which greatly affects work speed).

I'm not even talking about LSP problems in **all** editors for **all** languages I tested (Rust, Go, Python, TypeScript). None of them can properly separate imports and class implementations.

**PyCharm**:
![181](/images/blog/no-good-tools-only-ones-im-used-to-1.webp)

**VS Code**:
![180 v class](/images/blog/no-good-tools-only-ones-im-used-to-2.webp)

**Neovim**:
![LSP References](/images/blog/no-good-tools-only-ones-im-used-to-3.webp)

So here's what we have based on my experience:

**Neovim (7/10)** - quite fast, generally very convenient for code editing, but severely lacks functionality like refactoring, convenient navigation through implementations (a problem with all LSPs), and similar features, can't find only imports rather than all class occurrences, and so on.

**VS Code (8/10)** - convenient tool, probably the perfect balance among all editors, but poor support for Vim motions and neovim plugins affects usability. Also has very good font rendering, probably the best among all existing editors at the moment.

**PyCharm (4/10)** - the most feature-rich tool for working with code, but the slowest and most uncomfortable in terms of typing.

**Helix (7/10)** - god-like speed, but lack of plugins and non-standard keybindings currently discourage its use.

I'll probably stick with **VS Code** (Cursor) with partial use of Neovim for now. Maybe I'll return to JetBrains in the future if I need to use the debugger frequently. Who knows, everything might change.

*The perfect tool doesn't exist, each has its drawbacks and we have to accept them. Sometimes it's speed, sometimes it's functionality, and sometimes it's both at once.*

**P.S. I didn't specifically mention Zed because it is far from being used as the main editor.**
