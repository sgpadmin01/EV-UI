## 2026-08-12 - Framework-less DOM Cache Guards for Embedded HMI
**Learning:** High-frequency DOM manipulation (such as 60 FPS animation loops or sub-second intervals) causes substantial layout and scripting overhead in framework-less architectures when writing unchanged values directly to DOM nodes.
**Action:** Always implement cache guards/dirty-checking to compare newly computed string/numeric values against cached representations, and only update properties (e.g. `textContent`, `style.transform`, `style.strokeDashoffset`, and `style.width`) when the value is completely different.
