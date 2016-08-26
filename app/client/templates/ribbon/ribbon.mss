/*****************************************************************************/
/* Ribbon: Style */
/*****************************************************************************/
.ribbon {
}

/* From : http://codepen.io/eode9/pen/twkKm */

.corner_ribbon {
  width: 300px;
  top: 20px;
  right: -100px;
  left: auto;
  text-align: center;
  line-height: 50px;
  height: 50px;
  letter-spacing: 1px;
  color: #f0f0f0;
  transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  position: fixed;
  background: #39d;
  font-size: 1.6em;
}

@media (max-width: 991px) {
  .corner_ribbon {
    line-height: 45px;
    height: 45px;
    font-size: 1.4em;
  }
}
