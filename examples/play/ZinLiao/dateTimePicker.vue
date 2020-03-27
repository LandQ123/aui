<template>
  <div>
    <!-- af-date-picker(datetime、datetimerange) -->
    <div class="box">
      <p>af-date-picker(type：datetime | datetimerange)</p>
      <div class="boxItem">
        <span class="demonstration">默认</span>
        <af-date-picker
          v-model="datetimePicker1"
          type="datetime"
          placeholder="选择日期时间">
        </af-date-picker>
      </div>
      <div class="boxItem">
        <span class="demonstration">带快捷选项</span>
        <af-date-picker
          v-model="datetimePicker2"
          align="right"
          type="datetime"
          placeholder="选择日期时间"
          :picker-options="pickerOptions1">
        </af-date-picker>
      </div>
      <div class="boxItem">
        <span class="demonstration">设置默认时间</span>
        <af-date-picker
          v-model="datetimePicker3"
          type="datetime"
          placeholder="选择日期时间"
          default-time="12:00:00">
        </af-date-picker>
      </div>
      <div class="boxItem">
        <span class="demonstration">默认(范围)</span>
        <af-date-picker
          v-model="datetimePicker4"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期时间"
          end-placeholder="结束日期时间">
        </af-date-picker>
      </div>
      <div class="boxItem">
        <span class="demonstration">带快捷选项(范围)</span>
        <af-date-picker
          v-model="datetimePicker5"
          type="datetimerange"
          :picker-options="pickerOptions2"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right">
        </af-date-picker>
      </div>
      <div class="boxItem">
        <span class="demonstration">起始日期时刻为 12:00:00(范围)</span>
        <af-date-picker
          v-model="datetimePicker6"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']">
        </af-date-picker>
      </div>
      <div class="boxItem">
        <span class="demonstration">起始日期时刻为 12:00:00，结束日期时刻为 08:00:00</span>
        <af-date-picker
          v-model="datetimePicker7"
          type="datetimerange"
          align="right"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00', '08:00:00']">
        </af-date-picker>
      </div>
    </div>

    <!-- af-date-picker(date) -->
    <div class="box">
      <p>af-date-picker(type：date)</p>
      <div class="boxItem">
        <span class="demonstration">周</span>
        <af-date-picker
          v-model="datePicker1"
          type="week"
          format="yyyy 第 WW 周"
          placeholder="选择周">
        </af-date-picker>
      </div>
      <div class="boxItem">
        <span class="demonstration">月</span>
        <af-date-picker
          v-model="datePicker2"
          type="month"
          placeholder="选择月">
        </af-date-picker>
      </div>
      <div class="boxItem">
        <span class="demonstration">年</span>
        <af-date-picker
          v-model="datePicker3"
          type="year"
          placeholder="选择年">
        </af-date-picker>
      </div>
      <div class="boxItem">
        <span class="demonstration">多个日期</span>
        <af-date-picker
          v-model="datePicker4"
          type="dates"
          placeholder="选择一个或多个日期">
        </af-date-picker>
      </div>
      <div class="boxItem">
        <span class="demonstration">默认(范围)</span>
        <af-date-picker
          v-model="datePicker5"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </af-date-picker>
      </div>
      <div class="boxItem">
        <span class="demonstration">带快捷选项(范围)</span>
        <af-date-picker
          v-model="datePicker6"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions2">
        </af-date-picker>
      </div>
      <div class="boxItem">
        <span class="demonstration">默认为 Date 对象</span>
        <af-date-picker
          v-model="datePicker7"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日">
        </af-date-picker>
      </div>
      <div class="boxItem">
        <span class="demonstration">使用 value-format，值：{{ datePicker8 }}</span>
        <af-date-picker
          v-model="datePicker8"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd">
        </af-date-picker>
      </div>
      <div class="boxItem">
        <span class="demonstration">时间戳，值：{{ datePicker9 }}</span>
        <af-date-picker
          v-model="datePicker9"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="timestamp">
        </af-date-picker>
      </div>
    </div>

    <!-- af-time-picker & af-time-select -->
    <div class="box">
      <p>af-time-picker & af-time-select</p>
      <div class="boxItem">
        <span class="demonstration">默认</span>
        <af-time-select
          v-model="timePicker1"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30'
          }"
          placeholder="HH:MM">
        </af-time-select>
      </div>
      <div class="boxItem">
        <span class="demonstration">任意时间点(鼠标滚轮选择)</span>
        <af-time-picker
          v-model="timePicker2"
          :picker-options="{
            selectableRange: '18:00:00 - 20:30:00'
          }"
          placeholder="任意时间点">
        </af-time-picker>
      </div>
      <div class="boxItem">
        <span class="demonstration">任意时间点(箭头点击选择)(移除)</span>
        <af-time-picker
          v-model="timePicker3"
          :picker-options="{
            selectableRange: '18:00:00 - 20:30:00'
          }"
          arrow-control
          placeholder="任意时间点">
        </af-time-picker>
      </div>
      <div class="boxItem">
        <span class="demonstration">固定时间范围</span>
        <af-time-select
          v-model="timePicker4"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30'
          }"
          placeholder="起始时间">
        </af-time-select>
        &nbsp;
        <af-time-select
          v-model="timePicker5"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30',
            minTime: timePicker4
          }"
          placeholder="结束时间">
        </af-time-select>
      </div>
      <div class="boxItem">
        <span class="demonstration">任意时间范围</span>
        <af-time-picker
          is-range
          v-model="timePicker6"
          range-separator="-"
          start-placeholder="HH:MM:SS"
          end-placeholder="HH:MM:SS">
        </af-time-picker>
      </div>
    </div>
    <af-button type="primary" @click="inputAllData">log to console</af-button>

    <div class="box">
      <p>结合表单用法</p>
      <div class="boxItem">
        <af-form>
          <af-form-item>
            <af-date-picker
              v-model="datetimePicker1"
              type="datetime"
              placeholder="选择日期时间"
              label="datetime：">
            </af-date-picker>
          </af-form-item>
          <af-form-item>
            <af-date-picker
              v-model="datetimePicker4"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期时间"
              end-placeholder="结束日期时间"
              label="datetimerange：">
            </af-date-picker>
          </af-form-item>
          <af-form-item>
            <af-date-picker
              v-model="datePicker7"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              label="date：">
            </af-date-picker>
          </af-form-item>
          <af-form-item>
            <af-date-picker
              v-model="datePicker5"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              label="daterange：">
            </af-date-picker>
          </af-form-item>
          <af-form-item>
            <af-time-picker
              v-model="timePicker2"
              :picker-options="{
                selectableRange: '18:00:00 - 20:30:00'
              }"
              placeholder="任意时间点"
              label="time：">
            </af-time-picker>
          </af-form-item>
          <af-form-item>
            <af-time-picker
              is-range
              v-model="timePicker6"
              range-separator="-"
              start-placeholder="HH:MM:SS"
              end-placeholder="HH:MM:SS"
              label="timerange：">
            </af-time-picker>
          </af-form-item>
        </af-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datetimePicker1: "",
      datetimePicker2: "",
      datetimePicker3: "",
      datetimePicker4: "",
      datetimePicker5: "",
      datetimePicker6: "",
      datetimePicker7: "",

      datePicker1: "",
      datePicker2: "",
      datePicker3: "",
      datePicker4: "",
      datePicker5: "",
      datePicker6: "",
      datePicker7: "",
      datePicker8: "",
      datePicker9: "",

      timePicker1: "",
      timePicker2: "",
      timePicker3: "",
      timePicker4: "",
      timePicker5: "",
      timePicker6: "",
      timePicker7: "",

      pickerOptions1: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }
        ]
      },
      pickerOptions2: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      },
    }
  },
  methods: {
    inputAllData() {
      Object.keys(this).forEach(val => {
        if (/^timePicker/.test(val)) {
          console.log(val + ':' + this[val])
        }
        if (/^datePicker/.test(val)) {
          console.log(val + ':' + this[val])
        }
        if (/^datetimePicker/.test(val)) {
          console.log(val + ':' + this[val])
        }
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.box {
  padding: 0 5px 15px;
  margin-bottom: 10px;
  border-bottom: 2px dotted #aaaaaa;

  P {
    padding-top: 10px;
    margin-bottom: 10px;
  }
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}
.boxItem {
  display: inline-block;
  padding: 5px 10px 20px 5px;

  .demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 10px;
  }
}
</style>