<template>
  <el-dialog
    :width="dialogWidth"
    title="Dự án mới"
    :visible.sync="visibleSync"
    :show-close="false"
  >
    <el-form ref="formCreate" :model="form" :rules="rules" label-position="top">
      <el-form-item label="Tên dự án" prop="name" required>
        <el-input
          v-model="form.name"
          autocomplete="off"
          size="small"
        ></el-input>
      </el-form-item>
      <el-form-item label="Trạng thái" prop="status" required>
        <el-select
          style="width: 100%"
          v-model="form.status"
          allow-create
          filterable
          clearable
          size="small"
          placeholder="Trạng thái dự án"
        >
          <el-option
            class="flex justify-between items-center"
            v-for="(item, index) in optionsStatus"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
            <span>{{ item.label }}</span>
            <span
              class="w-2 h-2 rounded-full shadow"
              :style="{ background: item.color }"
            ></span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Thời gian" required>
        <el-col :span="11">
          <el-form-item prop="timeStart">
            <el-date-picker
              style="width: 100%"
              type="date"
              v-model="form.timeStart"
              size="small"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="text-center" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="timeEnd">
            <el-date-picker
              style="width: 100%"
              v-model="form.timeEnd"
              size="small"
              :picker-options="pickerEndOptions"
              placeholder="Ngày kết thúc"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="Bảo trì">
        <el-col :span="11">
          <el-form-item prop="maintenance">
            <el-input-number
              v-model="form.maintenance"
              :min="0"
              size="small"
              style="width: 100%"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <span class="px-2">(ngày)</span>
        </el-col>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="visibleSync = false">Hủy bỏ</el-button>
      <el-button size="small" type="primary" @click="onSave">Tạo mới</el-button>
    </span>
  </el-dialog>
</template>
<script>
import moment from "moment";
import { PROJECT_CREATE } from "../../constants/actionTypes";
import { COLORS, WINDOW_SIZE } from "../../constants";

export default {
  name: "form-create",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      optionsStatus: [
        {
          label: "Đàm phán",
          value: "Đàm phán",
          key: "negotiate",
          color: COLORS.negotiate,
        },
        {
          label: "Đã đàm phán",
          value: "Chưa bắt đầu",
          key: "not_started",
          color: COLORS.not_started,
        },
        {
          label: "Đã bắt đầu",
          value: "Bắt đầu",
          key: "started",
          color: COLORS.started,
        },
        {
          label: "Đã kết thúc",
          value: "Kết thúc",
          key: "finished",
          color: COLORS.finished,
        },
      ],
      form: {
        name: "",
        timeStart: "",
        timeEnd: "",
        maintenance: "",
        status: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "Yêu cầu nhập tên dự án",
            trigger: "blur",
          },
        ],
        status: [
          {
            required: true,
            message: "Yêu cầu nhập trạng thái dự án",
            trigger: "blur",
          },
        ],
        timeStart: [
          {
            required: true,
            message: "Yêu cầu nhập ngày bắt đầu (dự kiến)",
            trigger: "blur",
          },
        ],
        timeEnd: [
          {
            required: true,
            message: "Yêu cầu nhập ngày kết thúc (dự kiến)",
            trigger: "blur",
          },
        ],
        maintenance: [
          {
            required: true,
            message: "Yêu cầu nhập ngày kết thúc",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    visibleSync: {
      get: function () {
        return this.visible;
      },
      set: function (value) {
        this.$emit("onVisible", value);
      },
    },
    dialogWidth() {
      if (this.$vssWidth < WINDOW_SIZE.sm) return "80%";
      if (this.$vssWidth < WINDOW_SIZE.md) return "70%";
      if (this.$vssWidth < WINDOW_SIZE.lg) return "60%";
      if (this.$vssWidth < WINDOW_SIZE.xl) return "50%";

      return "40%";
    },
    pickerStartOptions() {
      return {
        disabledDate: (time) => {
          if (!this.form.timeEnd) return false;

          const _timeEnd = new Date(this.form.timeEnd).getTime();
          return time.getTime() > _timeEnd;
        },
      };
    },
    pickerEndOptions() {
      return {
        disabledDate: (time) => {
          if (!this.form.timeStart) return false;

          const _timeStart = new Date(this.form.timeStart).getTime();
          return time.getTime() < _timeStart;
        },
      };
    },
  },
  methods: {
    onSave() {
      this.$store.dispatch(`project/${PROJECT_CREATE}`, {
        project: {
          ...this.form,
          timeStart: this.form.timeStart
            ? moment(this.form.timeStart).format("YYYY-MM-DD")
            : "",
          timeEnd: this.form.timeEnd
            ? moment(this.form.timeEnd).format("YYYY-MM-DD")
            : "",
        },
      });
      this.visibleSync = false;
      this.$refs.formCreate.resetFields();
    },
  },
};
</script>
<style scoped>
</style>
