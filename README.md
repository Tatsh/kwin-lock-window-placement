# Lock window placement

This extension to Plasma makes a menu entry on any application context menu
(right click title bar) which allows locking/unlocking the window's geometry
(width/height/x/y).

## First time installation

```shell
curl -q -L --output kwin-lock-window-placement-master.zip https://github.com/Tatsh/kwin-lock-window-placement/archive/master.zip && plasmapkg2 --install kwin-lock-window-placement-master.zip
```

## Upgrading

Same as above but with `--upgrade`:

```shell
curl -q -L --output kwin-lock-window-placement-master.zip https://github.com/Tatsh/kwin-lock-window-placement/archive/master.zip && plasmapkg2 --upgrade kwin-lock-window-placement-master.zip
```

## Uninstallation

```shell
plasmapkg2 --type KWin/Script --remove lockWindowPlacement
```
