import axios from "axios";
import { Howl, Howler } from "howler";

var PlayerController = function (playlist) {
  this.playlist = playlist;
  this.index = 0;
  this.howl = null;
};

PlayerController.prototype = {
  play: async function (index) {
    var self = this;

    index = typeof index === "number" ? index : self.index;
    var data = self.playlist[index];

    const response = await axios.get(
      `http://localhost:5333/data/audio_files/${data.id}.mp3`,
      {
        responseType: "blob",
      }
    );
    const audioUrl = URL.createObjectURL(response.data);

    if (self.howl) {
      self.howl.stop();
    }

    this.howl = new Howl({
      src: [audioUrl],
      html5: true,
      format: ["mp3"],
      onload: function () {},
      onend: function () {
        self.skip("next");
      },
      onpause: function () {},
      onstop: function () {},
      onseek: function () {
        requestAnimationFrame(self.step.bind(self));
      },
    });

    this.howl.play();
    self.index = index;
    return true;
  },

  resume: function () {
    var self = this;

    if (self.howl) {
      self.howl.play();
      return true;
    }
    return false;
  },

  pause: function () {
    var self = this;

    if (self.howl) {
      console.log("Pausing", self.howl);

      self.howl.pause();
    }
  },

  stop: function () {
    Howler.stop();
  },

  loop: function (_loop) {
    this.howl.loop(_loop);
  },

  skip: function (direction) {
    var self = this;

    var index = 0;
    if (direction === "prev") {
      index = self.index - 1;
      if (index < 0) {
        index = self.playlist.length - 1;
      }
    } else {
      index = self.index + 1;
      if (index >= self.playlist.length) {
        index = 0;
      }
    }

    self.skipTo(index);
  },

  skipTo: function (index) {
    var self = this;

    if (self.howl) {
      self.howl.stop();
    }

    self.play(index);
  },

  /**
   * Set the volume and update the volume slider display.
   * @param  {Number} val Volume between 0 and 1.
   */
  volume: function (val) {
    Howler.volume(val);
  },

  seek: function (per) {
    var self = this;

    var sound = self.howl;

    if (sound.playing()) {
      sound.seek(sound.duration() * (per / 100));
    }
  },

  getSeek: function () {
    var self = this;

    var sound = self.howl;

    return sound?.seek() || 0;
  },

  step: function () {
    var self = this;

    var sound = self.howl;

    var seek = sound.seek() || 0;

    if (sound.playing()) {
      requestAnimationFrame(self.step.bind(self));
    }
  },

  set_playlist: function (playlist) {
    this.stop();
    this.playlist = playlist;
  },

  /**
   * Toggle the playlist display on/off.
   */
  togglePlaylist: function () {},

  /**
   * Toggle the volume display on/off.
   */
  toggleVolume: function () {
    var self = this;
  },
};

var playerController = new PlayerController([]);

export default playerController;
