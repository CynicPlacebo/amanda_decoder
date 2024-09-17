/************************* GLOBAL VARIABLES *************************/
var G = {
  'dom':{},
  'cipher':[], //array of ids that have been typed in order ('' for space)
  'ids_to_cache':[
    'backLine0','backLine1','backLine2','backLine3','backLine4','backLine5','backLine6','backLine7',
	'controlDesign','controlLegend',
	'customGlyphs','design','encodedMessage',
    'gA','gB','gC','gD','gE','gF','gG','gH','gI','gJ','gK','gL','gM',
	'gN','gO','gP','gQ','gR','gS','gT','gU','gV','gW','gX','gY','gZ',
	'g0','g1','g2','g3','g4','g5','g6','g7','g8','g9',
	'glyphDesigner',
	'keyboard','keyboard0','keyboard1','keyboard2',
	'legend',
	'translation',
  ],
  'index':{'glyph_type':0, 'dot_prefix':1, 'dots':2, 'line_prefix':3, 'lines':4},
  'img_dir':'img/',
  'img_ext':'.svg',
  'svg_paths':{
	'default_height':200, //I made SVGs 200x200px in Inkscape
	'border':'m 0,0 c 0,66.666667 0,133.33333 0,200 66.666667,0 133.33333,0 200,0 0,-66.66667 0,-133.333333 0,-200 C 133.33333,0 66.666667,0 0,0 Z m 7,7 c 62,0 124,0 186,0 0,62 0,124 0,186 -62,0 -124,0 -186,0 C 7,131 7,69 7,7 Z',
	'dot_radius':22.5,
    'dots':[ //X,Y coordinates for dot0.svg - dot8.svg
	  [22.5,22.5],
	  [100,22.5],
	  [177.5,22.5],
	  [22.5,100],
	  [100,100],
	  [177.5,100],
	  [22.5,177.5],
	  [100,177.5],
	  [177.5,177.5]
	],
	'lines':[ //Path definition for line0.svg - line7.svg (crafted in Inkscape, but done through JS to allow for fill color inheritance)
	  'M 0,0 C 0.14054044,2.867535 -0.27964403,5.968054 0.20898438,8.6914062 L 95.755859,104.23828 c 0.0029,-0.003 0.0049,-0.007 0.0078,-0.01 A 6,6 0 0 0 100,106 a 6,6 0 0 0 6,-6 6,6 0 0 0 -1.76172,-4.246094 l 0.002,-0.002 C 72.322861,63.834578 40.405656,31.917375 8.4882812,0 Z',
	  'm 94,0 v 100 a 6,6 0 0 0 6,6 6,6 0 0 0 6,-6 V 0 Z',
	  'm 191.51953,0 c -31.9211,31.920633 -63.84257,63.841085 -95.763671,95.761719 0.0029,0.0029 0.0049,0.0068 0.0078,0.0098 A 6,6 0 0 0 94,100 a 6,6 0 0 0 6,6 6,6 0 0 0 4.22852,-1.76367 l 0.0117,0.0117 C 136.16013,72.328153 168.08011,40.408172 200,8.4882812 V 0 c -2.82691,-8.4852735e-5 -5.65355,8.4852729e-5 -8.48047,0 z',
	  'M 0,93.994141 V 105.99414 H 99.917969 A 6,6 0 0 0 100,106 a 6,6 0 0 0 6,-6 6,6 0 0 0 -6,-6 6,6 0 0 0 -0.0078,0 v -0.0059 z',
	  'm 100,94 a 6,6 0 0 0 -6,6 6,6 0 0 0 5.992188,6 v 0.008 H 200 V 94.007812 H 100.29492 A 6,6 0 0 0 100,94 Z',
	  'm 100,94 a 6,6 0 0 0 -4.236328,1.771484 l -0.01953,-0.01953 C 63.829367,127.6672 31.914775,159.58281 0,191.49805 V 200 c 2.8627613,-0.14107 5.9592368,0.28037 8.6777344,-0.20898 C 40.528786,167.93997 72.379422,136.08934 104.23047,104.23828 l -0.002,-0.002 A 6,6 0 0 0 106,100 6,6 0 0 0 100,94 Z',
	  'm 100,94 a 6,6 0 0 0 -6,6 h -0.01367 v 100 h 12 V 100.19336 A 6,6 0 0 0 106,100 6,6 0 0 0 100,94 Z',
	  'm 100,94 a 6,6 0 0 0 -6,6 6,6 0 0 0 1.765625,4.23047 c -0.0062,0.006 -0.01335,0.0114 -0.01953,0.0176 C 127.66273,136.16533 159.57947,168.08271 191.49609,200 H 200 c -0.14109,-2.86276 0.28043,-5.95926 -0.20898,-8.67773 C 168.0259,159.55781 136.2612,127.79375 104.49609,96.029297 A 6,6 0 0 0 100,94 Z',
	]
  },
  'type':{'dot':0, 'line':1, 'both':2},
  'unknown_characters':['B','C','J','K','Q','X','0','1','2','3','4','5','6','7','8','9'], //Not yet revealed in Amanda the Adventurer
};


/************************* FUNCTIONS *************************/

/**
* Set up page for user interaction
*/
function amanda_cipher_init() {
  init_legend();
  init_dom();
  // Legend had to be visible for svgGenerate(), but now we can hide it
  toggleVisibility('legend', G.dom.controlLegend);
  // Create initial keyboard, even though custom glyphs will be added later
  glyphKeyboardPopulate();
}


/**
* Creates any dynamic DOM elements we need and caches them in G.dom
*/
function init_dom() {
  for (let id of G.ids_to_cache)
    G.dom[id] = document.getElementById(id);
}


/**
* Creates the Legend at the top of the Glyphs we are 100% certain of
*/
function init_legend() {
  let gs = document.getElementsByClassName("glyph");
  for (let i=0; i < gs.length; i++) {
	let g = gs[i];
	let id = 'g_' + getSortableGlyphName(g);
	g.id = id;
	svgGenerate(g.dataset.dots, g.dataset.lines, g);
  }
}


/**
* Handles Event for selecting a new Character for your Custom Glyph
*/
function customGlyphSetCharacter(e) {
  let sel = e.target;
  let glyphWrap = sel.parentNode;
  let glyph = null;
  for (let i=0; i < glyphWrap.childNodes.length; ++i) {
	glyph = glyphWrap.childNodes[i];
	if (glyph.classList.contains('glyph'))
      break; //We found our peer .glyph
  }
  glyph.dataset.character = sel.value;
  sel.dataset.character = sel.value;
  translate(); //Since a character value changed
}


/**
* Handles Click Events from <img> in #glyphDesigner
* @param img: the img element that was clicked
*/
function design(img) {
  // Lines need to activate .backgroundOnly images
  if (img.dataset.lines) {
    let id = 'backLine' + img.dataset.lines;
	G.dom[id].classList.toggle("active");
  }
  // Both Dots & Lines need to .activate the .templateButton
  img.classList.toggle("active");
}


/**
* Adds a Custom User Glyph based on images in #glyphDesigner
* img.active means it's one the user wants colored in
*/
function designGlyphAdd() {
  // Get all .templateButton that also have .active
  let actives = document.querySelectorAll("#glyphDesigner img.templateButton.active");
  let dots = [];
  let lines = [];
  // Get all their Dots/Lines so we can create an SVG for them
  for (let i=0; i < actives.length; ++i) {
    if (actives[i].dataset.dots)
      dots.push(actives[i].dataset.dots);
    if (actives[i].dataset.lines)
      lines.push(actives[i].dataset.lines);
  }
  // Ensure correct sorting (single characters, so alphabetic is sufficient)
  dots.sort();
  lines.sort();
  dots = dots.join('');
  lines = lines.join('');
  // Ensure this Glyph hasn't already been added
  let glyph = document.createElement('div');
  glyph.classList.add('glyph', 'custom');
  glyph.dataset.dots = dots;
  glyph.dataset.lines = lines;
  let id = 'g_' + getSortableGlyphName(glyph);
  let preExistingGlyph = document.getElementById(id);
  if (null != preExistingGlyph) {
    alert("That glyph already exists.");
	return; //Exist before adding to DOM
  }
  glyph.id = id;
  
  // Create an Element to hold the Custom Glyph in #customGlyphs (must do first, since svgGenerate pulls parent SIZE from DOM)
  let glyphWrap = document.createElement('div');
  glyphWrap.classList.add('glyphWrap');
  glyphWrap.appendChild(glyph);
  G.dom.customGlyphs.appendChild(glyphWrap);
  // Generate an SVG for the Custom Glyph
  svgGenerate(dots, lines, glyph);
  // Add <select> to set the desired letter
  let sel = generateCharacterSelect();
  glyph.dataset.character = sel.dataset.character;
  glyphWrap.appendChild(sel);
  // Repopulate Keyboard
  glyphKeyboardPopulate();
}


/**
* Remove all .active classes from images in #glyphDesigner
*/
function designGlyphReset() {
  let actives = document.querySelectorAll("#glyphDesigner img.active");
  for (let i=0; i < actives.length; ++i)
    actives[i].classList.remove('active');
}


/**
* Remove the Custom Designed User Glyphs
* @param deleteAll: true to delete all, otherwise it deletes only the last glyph
*/
function designGlyphDelete(deleteAll=false) {
  let glyphs = "the last glyph";
  if (true === deleteAll)
    glyphs = "all the glyphs";
  if (confirm("Are you certain you want to delete " + glyphs + "?")) {
    while (G.dom.customGlyphs.lastChild) {
	  G.dom.customGlyphs.removeChild(G.dom.customGlyphs.lastChild);
	  if (true !== deleteAll)
        break; //Only remove the very last one, and nothing else
	}
  }
}


/**
* After a user creates a Custom Glyph, they need to be able to specify what letter it should represent.
*/
function generateCharacterSelect() {
  let cs = G.unknown_characters;
  let rtn = document.createElement('select');
  let selects = document.querySelectorAll("#customGlyphs select");
  let selectedI = selects.length; //Index to select (select subsequent one each time)
  rtn.dataset.character = cs[0]; //Default to first unknown character
  for (let i=0; i < cs.length; ++i) {
	let c = cs[i];
    let opt = document.createElement('option');
	opt.value = c;
	opt.innerText = c;
	if (i == selectedI) {
      rtn.dataset.character = c;
	  opt.selected = "selected";
	}
	rtn.appendChild(opt);
  }
  // Retranslate each time Users changes letter selection
  rtn.addEventListener('change', function(e) { customGlyphSetCharacter(e); }, false);
  return rtn;
}


/**
* Gets the TYPE of glyph this is (Dots, Lines, or Both)
* These are represented by G.type.dot/line/both (or 0,1,2 respectively)
* @param g: the element with datasets for dots/lines or both
*/
function getSortableGlyphName(g) {
  let dots = (g.dataset.dots) ? g.dataset.dots : '';
  let d1 = (dots.length > 0) ? dots.substr(0,1) : '';
  let lines = (g.dataset.lines) ? g.dataset.lines : '';
  let l1 = (lines.length > 0) ? lines.substr(0,1) : '';
  let prefixDots = dots.length + d1; //Sorts better with a prefix
  let prefixLines = lines.length + l1;
  let type = G.type.dot; //Default to dot (so if it is "blank" that counts as a dot type so it sorts at the very beginning)
  if (lines.length > 0) {
    if (dots.length > 0)
      type = G.type.both;
    else
      type = G.type.line;
  }
  //Return something that sorts alphabetically (type is king, then simplicity, then first character)
  return type + '_' + prefixDots + '_' + dots + '_' + prefixLines + '_' + lines;
}


/** Events for "Backspace" & "Add Space" */
function glyphKeyboardBackspace() { G.cipher.pop(); translate(); }
function glyphKeyboardSpace() { G.cipher.push(''); translate(); }
/**
* Event for when a keyboard button gets clicked
*/
function glyphKeyboardType(e) {
  console.log("=== FUNC: glyphKeyboardType() ===");
  let glyph = e.target;
  while ('DIV' != glyph.tagName) //Sometimes it gets the SVG instead of the Div
    glyph = glyph.parentNode;
  let id = glyph.dataset.id;
  G.cipher.push(id);
  translate();
}


/**
* Wipes #keyboard and repopulates it with all known & custom user glyphs
*/
function glyphKeyboardPopulate() {
  purgeKids(G.dom.keyboard0);
  purgeKids(G.dom.keyboard1);
  purgeKids(G.dom.keyboard2);
  let customHash = {}; //Hashes "type_dots_lines" to save data-character attrib for each custom glyph
  let knownHash = {}; //Hashes "type_dots_lines" so we know if they are the known color or not
  let allGlyphs = []; //Known & Custom
  // Get known glyphs
  let knownG = document.querySelectorAll("#legend .glyph");
  for (let i=0; i < knownG.length; ++i) {
	let g = knownG[i];
	let hashName = getSortableGlyphName(g);
	allGlyphs.push(hashName);
    knownHash[hashName] = g.dataset.character; //Save the character it represents
  }
  // Get custom glyphs (and keep them colored)
  let custG = document.querySelectorAll("#customGlyphs .glyph");
  for (let i=0; i < custG.length; ++i) {
	let g = custG[i];
	let hashName = getSortableGlyphName(g);
	allGlyphs.push(hashName);
    customHash[hashName] = g.dataset.character; //Save the character it represents
  }
  // Sort Glyphs by type
  allGlyphs.sort();
  // Add Glyphs to Keyboard
  for (let name of allGlyphs) {
    let a = name.split('_');
    let dots = a[G.index.dots];
    let lines = a[G.index.lines];
    let type = a[G.index.glyph_type];
	let div = document.createElement('div');
	div.classList.add('glyph');
	div.dataset.dots = dots;
	div.dataset.lines = lines;
	div.dataset.id = 'g_' + getSortableGlyphName(div); //Serves as a pointer to the legend/custGlyphs to translate with
	if (!(name in knownHash))
      div.classList.add('custom');
    // Retranslate each time Users changes letter selection
    div.addEventListener('click', function(e) { glyphKeyboardType(e); }, false);

    G.dom['keyboard' + type].appendChild(div);
    svgGenerate(dots, lines, div);
  }
}


/**
* Removes all childNodes from an element
* @param elem: the element to empty
*/
function purgeKids(elem) {
  while(elem.lastChild)
    elem.removeChild(elem.lastChild);
}


/**
* Create & Insert an SVG into the Parent Div. Also scale the SVG to fit.
* @param dots: String representing which dots to add (e.g. "012345678" is ALL dots. "012" would be dots on the TOP ROW)
* @param lines: String representing which line segments to add (e.g. "01234567" is ALL lines. "0257" would be an X of lines that touch the glyph corners)
* @param parentDiv: <div> to insert <svg> into
*/
function svgGenerate(dots, lines, parentDiv) {
  if (dots == null) dots = '';
  if (lines == null) lines = '';
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute('viewbox', '0 0 200 200');
  svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

  // Scale the SVG
  let g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  let scale = parentDiv.clientHeight / G.svg_paths.default_height;
  //console.log('SCALE: ' + scale);
  g.setAttribute('transform', 'scale('+scale+')');
  svg.appendChild(g);

  // Add Border
  svgInsertPath(G.svg_paths.border, g);

  // Add Dots
  for (let i=0; i < dots.length; ++i) {
    let n = dots.substr(i, 1);
    svgInsertCircle(G.svg_paths.dots[n], g);
  }

  // Add Lines
  for (let i=0; i < lines.length; ++i) {
    let n = lines.substr(i, 1);
    svgInsertPath(G.svg_paths.lines[n], g);
  }

  // Add Finalized SVG to DOM
  parentDiv.appendChild(svg);
}


/**
* Creates a <circle>, <rect>, or <path> to insert into the <svg>
* @param attributes: key/value associative array of attributes this tag needs
* @param parentSvg: the <svg> this element should be appended to
*/
function svgInsertElement(type, attributes, parentSvg) {
  let elem = document.createElementNS("http://www.w3.org/2000/svg", type);
  for (let k in attributes)
	elem.setAttribute(k, attributes[k]);
  parentSvg.appendChild(elem);
}
function svgInsertCircle(xy,parentSvg){ svgInsertElement('circle', {'cx':xy[0], 'cy':xy[1], 'r':G.svg_paths.dot_radius}, parentSvg); }
function svgInsertPath(d,parentSvg){ svgInsertElement('path', {'d':d}, parentSvg); }


/**
* Shows/Hides panels like Known Glyph Legend or Glyph Designer
*/
function toggleVisibility(divID, controller) {
  // Hide/Unhide the Section
  G.dom[divID].classList.toggle('invisible');
  // Deal with Controller Display Text (Show vs Hide)
  let prefix = 'Hide';
  let s = controller.innerText;
  if (s.match(/^Hide/))
    prefix = 'Show';
  controller.innerText = prefix + s.substr(4);
}


/**
* Translates the current typed message.
* Message stored in G.cipher as array of IDs of Glyphs that have been typed
* Can be either Known Glyphs or Custom Glyphs, because both use same ID protocol
*/
function translate() {
  // Wipe & do a FULL retranslation each time (in case values have changed)
  purgeKids(G.dom.encodedMessage);
  purgeKids(G.dom.translation);
  for (let id of G.cipher) {
    let glyph = (id.length == 0) ? null : document.getElementById(id);
	translateInsert(glyph);
  }
}

/**
* Uses the glyph to insert 1 character into the translation pane
* @param g: glyph with g.dataset.dots & g.dataset.lines
*/
function translateInsert(g) {
  let messageGlyph = document.createElement('div');
  let messageText = document.createElement('span');
  if (null == g) { //Intended as a "space"
    g = document.createElement('div'); //Dummy div to keep protocol consistent
	g.dataset.character = '&nbsp;&nbsp;';
	g.dataset.dots = '';
	g.dataset.lines = '';
	messageGlyph.classList.add('space');
  }
  let custom = g.classList.contains('custom');
  let c = g.dataset.character;
  messageGlyph.classList.add('glyph');
  messageText.innerHTML = c;
  if (custom) {
    messageGlyph.classList.add('custom');
    messageText.classList.add('custom');
  }
  G.dom.encodedMessage.appendChild(messageGlyph);
  G.dom.translation.appendChild(messageText);
  svgGenerate(g.dataset.dots, g.dataset.lines, messageGlyph);
}
