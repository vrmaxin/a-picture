<template>
  <div style="width:200px;height:200px;">
    <v-stage ref="stage"
             :config="stageSize">
      <v-layer>
        <v-shape :config="{
        sceneFunc: function(context, shape) {
          context.translate(100, 100);
          context.beginPath();
          context.moveTo(0, 0);
          context.arc(0,0,100,0, 60*Math.PI/180);
          context.closePath();

          // special Konva.js method
          context.fillStrokeShape(shape);
        },
        fill: '#FFAE8B'
      }"
                 @click="handleClick" />
        <v-shape :config="{
        sceneFunc: function(context, shape) {
          context.translate(100, 100);
          context.beginPath();
          context.moveTo(0, 0);
          context.arc(0,0,100,60*Math.PI/180,120*Math.PI/180);
          context.closePath();

          // special Konva.js method
          context.fillStrokeShape(shape);
        },
        fill: '#37A2DA'
      }" />
        <v-shape :config="{
        sceneFunc: function(context, shape) {
          context.translate(100, 100);
          context.beginPath();
          context.moveTo(0, 0);
          context.arc(0,0,100,120*Math.PI/180,180*Math.PI/180);
          context.closePath();

          // special Konva.js method
          context.fillStrokeShape(shape);
        },
        fill: '#32C5E9'
      }" />
        <v-shape :config="{
        sceneFunc: function(context, shape) {
          context.translate(100, 100);
          context.beginPath();
          context.moveTo(0, 0);
          context.arc(0,0,100,180*Math.PI/180,240*Math.PI/180);
          context.closePath();

          // special Konva.js method
          context.fillStrokeShape(shape);
        },
        fill: '#67E0E3'
      }" />
        <v-shape :config="{
        sceneFunc: function(context, shape) {
          context.translate(100, 100);
          context.beginPath();
          context.moveTo(0, 0);
          context.arc(0,0,100,240*Math.PI/180,300*Math.PI/180);
          context.closePath();

          // special Konva.js method
          context.fillStrokeShape(shape);
        },
        fill: '#9FE6B8'
      }" />
        <v-shape :config="{
        sceneFunc: function(context, shape) {
          context.translate(100, 100);
          context.beginPath();
          context.moveTo(0, 0);
          context.arc(0,0,100,300*Math.PI/180,360*Math.PI/180);
          context.closePath();

          // special Konva.js method
          context.fillStrokeShape(shape);
        },
        fill: '#FFDB5C'
      }" />
        <v-shape :config="{
        sceneFunc: function(context, shape) {
          context.translate(100, 100);
          context.beginPath();
          context.moveTo(0, 0);
          context.arc(0,0,50,0,360*Math.PI/180);
          context.closePath();

          // special Konva.js method
          context.fillStrokeShape(shape);
        },
        fill: '#FFFFFF',
        stroke: 'black',
        strokeWidth: 0,
        text: '122次',
      }" />
        <v-text ref="text1"
                :config="{
          x: 70,
          y: 20,
          fontFamily: 'Calibri',
          fontSize: 20,
          text: '122次',
          fill: '#FFFFFF'
        }" />
        <v-text ref="text2"
                :config="{
          x: 155,
          y: 28,
          fontFamily: 'Calibri',
          fontSize: 20,
          text: '189公里',
          fill: '#FFFFFF'
        }" />
        <v-text ref="text3"
                :config="{
          x: 145,
          y: 158,
          fontFamily: 'Calibri',
          fontSize: 20,
          text: '17小时',
          fill: '#FFFFFF'
        }" />
        <v-text ref="text4"
                :config="{
          x: 70,
          y: 168,
          fontFamily: 'Calibri',
          fontSize: 20,
          text: '1722个',
          fill: '#FFFFFF'
        }" />
        <v-text ref="text5"
                :config="{
          x: 28,
          y: 100,
          fontFamily: 'Calibri',
          fontSize: 16,
          text: '17个/公里',
          fill: '#FFFFFF'
        }" />
        <v-text ref="text6"
                :config="{
          x: 15,
          y: 90,
          fontFamily: 'Calibri',
          fontSize: 16,
          text: '17个/小时',
          fill: '#FFFFFF'
        }" />
        <v-text ref="text0"
                :config="{
          x: 65,
          y: 90,
          fontFamily: 'Calibri',
          fontSize: 22,
          text: name,
          fill: '#9FE6B8'
        }" />
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
const width = 200;
const height = 200;

export default {
  props: {
    name: {
      type: String
    }
  },
  data () {
    return {
      stageSize: {
        width: width,
        height: height
      }
    };
  },
  mounted () {
    var a = this.$refs.text1;
    var b = a.getStage();

    var a = this.$refs.text2;
    var b = a.getStage();
    b.rotation(60);

    var a = this.$refs.text3;
    var b = a.getStage();
    b.rotation(300);

    var a = this.$refs.text4;
    var b = a.getStage();

    var a = this.$refs.text5;
    var b = a.getStage();
    b.rotation(60);

    var a = this.$refs.text6;
    var b = a.getStage();
    b.rotation(300);
  },
  methods: {
    handleClick () {
      alert("asdads");
    }
  }
};
</script>