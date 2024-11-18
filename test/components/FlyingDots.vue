<template>
  <div class="flying-dots-container">
    <pre class="code-block">
      <code>
        &lt;template&gt;<br />
        &nbsp;&nbsp;&lt;div class="flying-dots-container"&gt;<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&lt;div <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;class="dot"<br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;v-for="n in 10" <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:key="n"<br />
        &nbsp;&nbsp;&nbsp;&nbsp;/&gt;<br />
        &nbsp;&nbsp;&lt;/div&gt;<br />
        &lt;/template&gt;
      </code>
    </pre>
    <div 
      class="dot"
      v-for="n in 10" 
      :key="n"
    />
  </div>
</template>

<style scoped>
.flying-dots-container {
  position: relative;
  width: 300px; /* Set the width of the container */
  height: 150px; /* Set the height of the container */
  pointer-events: none;
  overflow: hidden;
  z-index: 10;
}

.code-block {
  position: absolute;
  top: 0;
  left: 0;
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 10px;
  border-radius: 5px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 10px;
  line-height: 1.2;
  width: 100%;
  height: 100%;
}

.dot {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #4EC5D4, #2B90B6);
  opacity: 0.4;
  filter: blur(1px);
  box-shadow: 0 0 8px rgba(78, 197, 212, 0.6);
  animation: float 4s ease-in-out infinite;
}

/* Position dots within code block boundaries */
.dot:nth-child(1) { left: 10%; top: 20%; animation-delay: 0s; }
.dot:nth-child(2) { left: 20%; top: 30%; animation-delay: 0.4s; }
.dot:nth-child(3) { left: 30%; top: 40%; animation-delay: 0.8s; }
.dot:nth-child(4) { left: 40%; top: 50%; animation-delay: 1.2s; }
.dot:nth-child(5) { left: 50%; top: 60%; animation-delay: 1.6s; }
.dot:nth-child(6) { left: 60%; top: 70%; animation-delay: 2.0s; }
.dot:nth-child(7) { left: 70%; top: 80%; animation-delay: 2.4s; }
.dot:nth-child(8) { left: 80%; top: 90%; animation-delay: 2.8s; }
.dot:nth-child(9) { left: 90%; top: 100%; animation-delay: 3.2s; }
.dot:nth-child(10) { left: 100%; top: 110%; animation-delay: 3.6s; }

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(-10px, 10px) scale(1.1);
  }
  50% {
    transform: translate(-20px, 20px) scale(1);
  }
  75% {
    transform: translate(-10px, 30px) scale(0.9);
  }
}
</style>