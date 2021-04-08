<template>
  <d2-container class="page">
    <deploy />
  </d2-container>
</template>

<script>
import Deploy from '@/views/monitor/nodes/NodeUpgrade';
export default {
  components: {
    Deploy,
  },
  data () {
    return {
      filename: __filename,
    };
  },
};
</script>

<style lang="scss" scoped>
.index-card {
  margin: 10px 0;
  .index-card-title {
    font-size: 20px;
    line-height: 30px;
  }
  .index-card-subtitle {
    font-size: 16px;
    line-height: 32px;
    color: #666;
  }
  .index-card-subdetail {
    font-size: 14px;
    line-height: 20px;
    color: #888;
  }
  .index-card-desc {
    font-size: 12px;
    line-height: 20px;
    color: #777;
  }
  .el-divider,
  .el-divider--horizontal {
    margin: 4px 0;
  }
}
.page {
  .logo {
    width: 120px;
  }

  .btn-group {
    color: $color-text-placehoder;
    font-size: 12px;
    margin-top: 0px;
    margin-bottom: 20px;

    .btn-group__btn {
      color: $color-text-sub;

      &:hover {
        color: $color-text-main;
      }

      &.btn-group__btn--link {
        color: $color-primary;
      }
    }
  }
}
</style>
