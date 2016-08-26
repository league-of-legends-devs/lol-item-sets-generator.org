/*****************************************************************************/
/* Header: Style */
/*****************************************************************************/
.header {
  padding: 0;
  margin-bottom: 20px;
}

.title {
  width: 100%;
  margin: 0;
  padding: 0;
  font-size: 4.0em;
  line-height: 74px;
  height: 74px;
  box-shadow: 0 20px 20px -20px #333;
}

@media (max-width: 991px) {
  .title {
    font-size: 3.0em;
    line-height: 55px;
    height: 55px;
  }
}
@media (max-width: 767px) {
  .title {
    font-size: 2.0em;
    line-height: 37px;
    height: auto;
  }
}

.title,
.title small {
  background: rgb(200, 83, 0);
  color: white;
}

.currentPatch {
  background-color: rgba(242, 242, 242, 0.8);
  font-size: 2.0em;
  font-weight: bold;
  margin-top: 0;
  padding: 8px;
  position: relative;
  border: 1px solid #E0E0E0;
}

@media (max-width: 991px) {
  .currentPatch {
    font-size: 1.5em;
  }
}
@media (max-width: 767px) {
  .currentPatch {
    font-size: 1.2em;
  }
}

.login {
  background-color: rgba(242, 242, 242, 0.8);
  margin-top: 10px;
  padding: 4px;
  line-height: 13px;
}
