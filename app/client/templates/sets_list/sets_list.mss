/*****************************************************************************/
/* SetsList: Style */
/*****************************************************************************/
.sets_list {
}

.loadingText {
  font-size: 2.5em;
  font-weight: bold;
}

.itemSet {
  padding: 0;
  overflow: hidden;
}

.itemSetLink {
  background-color: rgba(195, 176, 164, 0.6);
}

.itemSetLink:hover {
  background-color: rgba(214, 86, 5, 0.6);
}

.itemSetRole {
  position: absolute;
  background-color: inherit;
  color: white;
  font-size: 14px;
  font-weight: bold;
  line-height: 20px;
  text-align: center;
  z-index: 10;
  width: 100%;
  height: 20px;
  top: 0;
  left: 0;
  margin: 0;
}

.champImage {
  width: 100%;
}

.spriteContainer {
  width: 100%;
}
.spriteContainer:before {
  content: "";
  display: block;
  padding-top: 100%;
}

.champSprite {
  background-image: url('https://feeder.lol-item-sets-generator.org/sprites/sprite.png');

  /* from : http://stackoverflow.com/a/28985475/4022804 */
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  text-align: center;
}
