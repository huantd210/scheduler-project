<template>
  <el-dialog
    :width="dialogWidth"
    title="Thông tin dự án"
    :visible.sync="visibleSync"
    :show-close="false"
    @open="onOpen"
    @close="onClose"
  >
    <el-form ref="formEdit" :model="form" :rules="rules" label-position="top">
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
              style="width: 100%"
              type="date"
              v-model="form.timeStart"
              size="small"
              :picker-options="pickerStartOptions"
              placeholder="Ngày bắt đầu"
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
      <el-button size="small" @click="visibleSync = false">Thoát</el-button>
      <el-button type="primary" size="small" @click="onSave">Lưu lại</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapGetters } from "vuex";
import { PROJECT_SELECTED, PROJECT_EDIT } from "../../constants/actionTypes";
import { WINDOW_SIZE } from "../../constants";

export default {
  name: "form-edit",
  data() {
    return {
      optionsStatus: [
        { label: "Đàm phán", value: "Đàm phán" },
        { label: "Chưa bắt đầu", value: "Chưa bắt đầu" },
        { label: "Bắt đầu", value: "Bắt đầu" },
        { label: "Kết thúc", value: "Kết thúc" },
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
      },
    };
  },
  computed: {
    ...mapGetters("project", ["getProjectSelected"]),
    visibleSync: {
      get() {
        return (
          !!this.getProjectSelected &&
          Object.keys(this.getProjectSelected).length > 0
        );
      },
      set(value) {
        if (!value) {
          this.$store.dispatch(`project/${PROJECT_SELECTED}`, {
            project: "",
          });
        }
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
    onOpen() {
      this.form = { ...this.getProjectSelected };
    },
    onSave() {
      this.$store.dispatch(`project/${PROJECT_EDIT}`, {
        project: { ...this.form },
      });
      this.visibleSync = false;
    },
    onClose() {
      this.$refs.formEdit.resetFields();
    },
  },
};
</script>
<style scoped>
</style>
