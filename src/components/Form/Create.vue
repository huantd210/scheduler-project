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
          v-model="form.status"
          placeholder="Trạng thái dự án"
          size="small"
          style="width: 100%"
        >
          <el-option
            v-for="(item, index) in optionsStatus"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Thời gian" required>
        <el-col :span="11">
          <el-form-item prop="timeStart">
            <el-date-picker
              type="date"
              placeholder="Ngày bắt đầu"
              v-model="form.timeStart"
              size="small"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="text-center" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item prop="timeEnd">
            <el-date-picker
              placeholder="Ngày kết thúc"
              v-model="form.timeEnd"
              size="small"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="Bảo hành (Ngày)" required>
        <el-col :span="11">
          <el-form-item prop="guarantee">
            <el-input-number
              v-model="form.guarantee"
              :min="0"
              size="small"
              style="width: 100%"
            ></el-input-number>
          </el-form-item>
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
import { WINDOW_SIZE } from "../../constants";

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
        { label: "Đàm phán", value: "Đàm phán" },
        { label: "Đã đàm phán (Chưa bắt đầu)", value: "Chưa bắt đầu" },
        { label: "Đã bắt đầu", value: "Bắt đầu" },
        { label: "Đã kết thúc", value: "Kết thúc" },
      ],
      form: {
        name: "",
        timeStart: "",
        timeEnd: "",
        guarantee: "",
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
        guarantee: [
          {
            required: true,
            message: "Yêu cầu nhập số ngày bảo hành (dự kiến)",
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
      if (this.$vssWidth < WINDOW_SIZE.lg) return "50%";
      if (this.$vssWidth < WINDOW_SIZE.xl) return "40%";

      console.log(this.$vssWidth);

      return "30%";
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
