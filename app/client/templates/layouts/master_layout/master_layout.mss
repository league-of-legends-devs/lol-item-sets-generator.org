/*****************************************************************************/
/* Master layout: Style */
/*****************************************************************************/
.master_layout {
  /*background: #FCFCFC;*/
  background-image: url(img/wallpaper.jpg);
  background-repeat: no-repeat;
  background-attachment:fixed;
  background-position: center center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.content {
  background-color: rgba(215, 175, 147, 0.5);
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.master_layout main {
  border: solid 1px #E0E0E0;
  background: #FCFCFC;
  padding-top: 10px;
  padding-bottom: 10px;
  flex: 1;
}

@media screen and (max-width: 767px) {
  .master_layout main {
    width: 80%;
  }
}
