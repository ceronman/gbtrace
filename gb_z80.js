var instructions = {
    LD_r_r: function (r1, r2) {
        return function (cpu) {
            cpu[r1] = cpu[r2];
        };
    },

    LD_r_mn: function (r) {
        return function (cpu, mem) {
            cpu[r] = mem.read(cpu.next_op());
        };
    },

    LD_r_mrr: function (r, rh, rl) {
        return function (cpu, mem) {
            cpu[r] = mem.read(cpu.word(rh, rl));
        };
    },

    LD_mrr_r: function (rh, rl, r) {
        return function (cpu, mem) {
            mem.write(cpu.word(rh, rl), cpu[r]);
        };
    },

    LD_mrr_mn: function (rh, rl) {
        return function (cpu, mem) {
            mem.write(cpu[rh, rl], mem.read(cpu.next_op()));
        };
    },

    LD_r_zr: function (r1, r2) {
        return function (cpu, mem) {
            cpu[r1] = mem.read(0xff00 + cpu[r2]);
        };
    },

    LD_zr_r: function (r1, r2) {
        return function (cpu, mem) {
            mem.write(0xff00 + cpu[r1], r2);
        };
    },

    LD_r_zn: function (r) {
        return function (cpu, mem) {
            cpu[r] = mem.read(0xff00 + mem.read(cpu.next_op()));
        };
    },

    LD_zn_r: function (r) {
        return function (cpu, mem) {
            mem.write(0xff00 + mem.read(cpu.next_op()), cpu[r]);
        };
    },

    LD_r_mnn: function (r) {
        return function (cpu, mem) {
            cpu[r] = mem.read((mem.read(cpu.next_op()) << 8) + mem.read(cpu.next_op()));
        };
    },

    LD_mnn_r: function (r) {
        return function (cpu, mem) {
            mem.write((mem.read(cpu.next_op()) << 8) + mem.read(cpu.next_op()), cpu[r]);
        };
    },

    LDI_r_mrr: function (r, rh, rl) {
        return function (cpu, mem) {
            cpu[r] = mem.read(cpu.word(rh, rl));
            cpu.inc_word(rh, rl);
        };
    },

    LDD_r_mrr: function (r, rh, rl) {
        return function (cpu, mem) {
            cpu[r] = mem.read(cpu.word(rh, rl));
            cpu.dec_word(rh, rl);
        };
    },

    LDI_mrr_r: function (rh, rl, r) {
        return function (cpu, mem) {
            mem.write(cpu.word(rh, rl), cpu[r]);
            cpu.inc_word(rh, rl);
        };
    },

    LDD_mrrd_r: function (rh, rl, r) {
        return function (cpu, mem) {
            mem.write(cpu.word(rh, rl), cpu[r]);
            cpu.dec_word(rh, rl);
        };
    },

    LD_rr_mnmn: function (rh, rl) {
        return function (cpu, mem) {
            cpu[rh] = mem.read(cpu.next_op());
            cpu[rl] = mem.read(cpu.next_op());
        };
    },

    LD_rr_rr: function (rh1, rl1, rh2, rl2) {
        return function (cpu) {
            cpu[rh1] = cpu[rh2];
            cpu[rl1] = cpu[rl2];
        };
    },

    PUSH_rr: function (rh, rl) {
        return function (cpu, mem) {
            mem.write(--cpu.stackp, cpu[rh]);
            mem.write(--cpu.stackp, cpu[rl]);
        };
    },

    POP_rr: function (rh, rl) {
        return function (cpu, mem) {
            cpu[rl] = mem.read(cpu.stackp++);
            cpu[rh] = mem.read(cpu.stackp++);
        };
    },

    LD_rr_sp: function (rh, rl) {
        return function (cpu, mem) {
            var e = (cpu.stackp + mem.read(cpu.next_op())) & 0xFFFF;
            cpu[rh] = e >> 8 & 0xFF;
            cpu[rl] = e & 0xFF;
            // TODO: check flags!
        };
    }
};