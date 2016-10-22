/*****************************************************************************/
/* ItemSet: Style */
/*****************************************************************************/
.item_set {
}

.title {
  font-weight: bold;
  font-size: 2.5em;
}

.champImage {
}

.itemBlocks {
  border: solid 1px black;
}

.descriptionContainer {
  margin-bottom: 20px;
  background-position: 0 -100px;
  background-size: cover;
  height: 260px;
  color: #E0E0E0;
  padding: 20px
}

@media screen and (max-width: 767px) {
  .descriptionContainer {
    background-position: center;
  }
}

.description {
  background-color: rgba(56, 56, 56, 0.6);
  -webkit-box-shadow: 0px 0px 8px 5px rgba(56, 56, 56, 0.6);
  -moz-box-shadow: 0px 0px 8px 5px rgba(56, 56, 56, 0.6);
  box-shadow: 0px 0px 8px 5px rgba(56, 56, 56, 0.6);
  position: relative;
  top: 100px;
}

@media screen and (max-width: 767px) {
  .description {
    top: 20px;
  }
}

.descriptionContent {
  padding: 0;
}

.itemBlock {
  padding: 15px;
}

.itemBlockDescription {
  font-weight: bold;
}

.item {
  display: inline-block;
  padding: 8px;
}

.itemImage {
}

.bottom_section {
  padding: 5px;
}

.download {
  width: 100%;
  height: 100%;
}
