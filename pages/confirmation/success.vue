<template>
    <centerlayout>
      <template v-slot:default>
          <div class="confirmation-container">
              <img src="~/assets/svg/success.svg" class="mail-sent-icon mbm" alt="" />
              <div class="confirmation-text">Your email has been successfully verified</div>
          </div>
      </template>
    </centerlayout>
</template>

<script>
import centerlayout from "@/components/layout/centerlayout";

export default {
    components: {
        centerlayout
    }
}
</script>

<style>
.mbm {
  margin-bottom: .8rem;
}

.confirmation-container {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.confirmation-text {
    text-align: center;
    color: var(--color-dark);
    font-size: 1.2rem;
}

.confirmation-text-link {
    color: var(--color-company);
    cursor: pointer;
}

.confirmation-text-link:hover {
    color: var(--color-company2);
}
</style>